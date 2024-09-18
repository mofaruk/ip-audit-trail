<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Client\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Tymon\JWTAuth\Facades\JWTAuth;

class ApiGatewayController extends Controller
{
    /**
     * forward api request to the microservice
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function forward(Request $request): JsonResponse
    {
        $uri = explode('/', $request->getRequestUri(), 5);
        $apiVersion = $uri[2];
        $mservice = $uri[3];

        $apiBaseUrl = config("microservices.services.$mservice.api_base_url");
        if (!$apiBaseUrl) {
            return response()->json([
                'error' => 'request service not found'
            ], 404);
        }
        $remoteUrl = rtrim($apiBaseUrl, '/') . '/' . $apiVersion . '/' . $uri[4];

        $response = $this->requestRemoteServer($request->method(), $remoteUrl, $request->all());

        return response()->json(json_decode($response->body()), $response->status());
    }

    /**
     * make api request to microservice
     *
     * @param string $method
     * @param string $url
     * @param array $data
     * @return Response
     */
    protected function requestRemoteServer(string $method, string $url, array $data = []): Response
    {
        $method =strtolower($method);
        if ($method === 'get') {
            return Http::withToken(JWTAuth::getToken())
                    ->withHeader('X-Auth-User-Id', auth()->user()->id)
                    ->withHeader('X-Auth-User-Role',  auth()->user()->role)
                    ->get($url);
        }

        return Http::withToken(JWTAuth::getToken())
            ->withHeader('X-Auth-User-Id', auth()->id())
            ->withHeader('X-Auth-User-Role',  auth()->user()->role)
            ->{$method}($url, $data);
        
    }
}
