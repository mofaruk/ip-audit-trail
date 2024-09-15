<?php

namespace App\Http\Controllers\Api;

use App\Models\IpAddress;
use Illuminate\Http\Request;

class IpAddressController extends BaseController
{
    /**
     * Get all IP addresses
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->sendApiResponse(IpAddress::all(), 200);
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
            'user_id' => 'required',
        ]);

        $ipAddress = IpAddress::create($request->all());

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
            'user_id' => 'integer',
        ]);

        $ipAddress = IpAddress::find($id); 
        if (!$ipAddress) {
            return $this->sendApiResponse(['error' => 'requested resource not found'], 404);
        }

        $ipAddress->update($request->all());

        return $this->sendApiResponse($ipAddress, 200);
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

        $ipAddress->delete();

        return $this->sendApiResponse(null, 204);
    }
}
