<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Classes\ApiUser;
use App\Models\IpAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class IpAddressController extends BaseController
{
    /**
     * Authenticated API user
     *
     * @var ApiUser
     */
    protected ApiUser $apiUser;

    /**
     * Default constructor of the controller
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->apiUser = $request->attributes->get('apiUser');
    }

    /**
     * Get all IP addresses
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if (!Gate::check('viewAny', new IpAddress)) {
            return $this->sendUnauthorizedResponse();
        }
        return $this->sendResponse(IpAddress::latest()->get(), 200);
    }

    /**
     * Create a new IP address
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ip' => 'required|ip',
            'label' => 'required|string|max:255',
            'comment' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->sendResponse($validator->errors(), 400);
        }

        if (!Gate::check('create', new IpAddress)) {
            return $this->sendUnauthorizedResponse();
        }

        $data = $request->all();
        $data['user_id'] = $this->apiUser->id;

        try {
            $ipAddress = IpAddress::create($data);
        } catch (Exception $ex) {
            Log::error($ex->getMessage());
            return $this->sendInternalErrorResponse();
        }

        return $this->sendResponse($ipAddress, 201);
    }

    /**
     * Get a specific IP address
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $ipAddress = IpAddress::find($id);

        if (!$ipAddress) {
            return $this->sendResponse(['error' => 'requested resource not found'], 404);
        }

        if (!Gate::any(['view', 'viewAny'], $ipAddress)) {
            return $this->sendUnauthorizedResponse();
        }

        return $this->sendResponse($ipAddress, 200);
    }

    /**
     * Update an IP address
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'ip' => 'ip',
            'label' => 'string|max:255',
            'comment' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->sendResponse($validator->errors(), 400);
        }

        $ipAddress = IpAddress::find($id);
        if (!$ipAddress) {
            return $this->sendResponse(['error' => 'requested resource not found'], 404);
        }

        if (!Gate::any(['update', 'updateAny'], $ipAddress)) {
            return $this->sendUnauthorizedResponse();
        }

        $data = $request->all();
        $data['modified_by'] = $this->apiUser->id;
        try {
            $ipAddress->update($data);
        } catch (Exception $ex) {
            Log::error($ex->getMessage(), $ex);
            return $this->sendInternalErrorResponse();
        }

        return $this->sendResponse($data, 200);
    }

    /**
     * Delete an IP address
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $ipAddress = IpAddress::find($id);
        if (!$ipAddress) {
            return $this->sendResponse(['error' => 'requested resource not found'], 404);
        }

        if (!Gate::any(['delete', 'deleteAny'], $ipAddress)) {
            return $this->sendUnauthorizedResponse();
        }

        try {
            $ipAddress->delete();
        } catch (Exception $ex) {
            Log::error($ex->getMessage(), $ex);
            return $this->sendInternalErrorResponse();
        }

        return $this->sendResponse(null, 204);
    }
}
