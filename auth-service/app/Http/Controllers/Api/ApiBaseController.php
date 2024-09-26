<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class ApiBaseController extends Controller
{
    /**
     * Wrap the response
     *
     * @param mixed $data
     * @param integer $httpStatusCode
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResponse(mixed $data, $httpStatusCode = 200): JsonResponse
    {
        return response()->json($data, $httpStatusCode);
    }

    /**
     * Send response for unautorized access
     *
     * @param mixed $data
     * @param integer $httpStatusCode
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendUnauthorizedResponse(): JsonResponse
    {
        return $this->sendResponse(['error' => 'Unathorized access'], 401);
    }

    /**
     * Send response for internal error
     *
     * @param mixed $data
     * @param integer $httpStatusCode
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendInternalErrorResponse(): JsonResponse
    {
        return $this->sendResponse(['error' => 'Something went wrong'], 500);
    }
}
