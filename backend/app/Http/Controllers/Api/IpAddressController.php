<?php

namespace App\Http\Controllers\Api;

use App\Classes\ApiUser;
use App\Models\IpAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class IpAddressController extends BaseController
{
    protected ApiUser $apiUser;

    public function __construct(Request $request) {
        $this->apiUser = $request->attributes->get('apiUser');
    }
    /**
     * Get all IP addresses
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if(!Gate::check('viewAny', new IpAddress)) {
            return $this->sendApiResponse(['error' => 'Unathorized access'], 401);
        }
        return $this->sendApiResponse(IpAddress::latest()->get(), 200);
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
            return $this->sendApiResponse($validator->errors(), 400);
        }

        if(!Gate::check('create', new IpAddress)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

        $data = $request->all();
        $data['user_id'] = $this->apiUser->id;

        $ipAddress = IpAddress::create($data);

        return $this->sendApiResponse($ipAddress, 201);
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
            return $this->sendApiResponse(['error' => 'requested resource not found'], 404);
        }

        if(!Gate::any(['view', 'viewAny'], $ipAddress)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access.'], 401);
        }

        return $this->sendApiResponse($ipAddress, 200);
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
            return $this->sendApiResponse($validator->errors(), 400);
        }

        $ipAddress = IpAddress::find($id);
        if (!$ipAddress) {
            return $this->sendApiResponse(['error' => 'requested resource not found'], 404);
        }

        if(!Gate::any(['update', 'updateAny'], $ipAddress)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

        $data = $request->all();
        $data['modified_by'] = $this->apiUser->id;
        $ipAddress->update($data);

        return $this->sendApiResponse($data, 200);
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
            return $this->sendApiResponse(['error' => 'requested resource not found'], 404);
        }

        if(!Gate::any(['delete', 'deleteAny'], $ipAddress)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

        $ipAddress->delete();

        return $this->sendApiResponse(null, 204);
    }
}
