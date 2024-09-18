<?php

namespace App\Http\Controllers\Api;

use App\Models\IpAddress;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Gate;

class IpAddressController extends BaseController
{
    protected User $user;

    public function __construct() {
        $this->user = new User;
        $this->user->id  = request()->header('X-Auth-User-Id');
    }

    /**
     * Get all IP addresses
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if($this->user->cannot('viewAny', new IpAddress)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
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
        $request->validate([
            'ip' => 'required|ip',
            'label' => 'required|string|max:255',
            'comment' => 'nullable|string|max:255',
        ]);

        if($this->user->cannot('create', new IpAddress)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

        $data = $request->all();
        $data['user_id'] = $this->user->id;

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

        if($this->user->cannot('view', $ipAddress)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

        if (!$ipAddress) {
            return $this->sendApiResponse(['error' => 'requested resource not found'], 404);
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
        $request->validate([
            'ip' => 'ip',
            'label' => 'string|max:255',
            'comment' => 'string|max:255',
        ]);

        $ipAddress = IpAddress::find($id);

        if($this->user->cannot('update', $ipAddress)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }


        if (!$ipAddress) {
            return $this->sendApiResponse(['error' => 'requested resource not found'], 404);
        }

        $data = $request->all();
        $data['modified_by'] = request()->header('X-Auth-User-Id');
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

        if($this->user->cannot('delete', $ipAddress)) {
            //return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

        if (!$ipAddress) {
            return $this->sendApiResponse(['error' => 'requested resource not found'], 404);
        }

        $ipAddress->delete();

        return $this->sendApiResponse(null, 204);
    }
}
