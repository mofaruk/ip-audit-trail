<?php

namespace App\Http\Middleware;

use App\Classes\ApiUser;
use Closure;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $bearerToken = $request->bearerToken();

        if (!$bearerToken) {
            return response(['message' => 'Auth token not found'], 403);
        }

        if (!$user = $this->validateBearerToken($bearerToken)) {
            return response(['message' => 'Invalid/Expired auth token'], 401);
        }
        
        $request->attributes->set('apiUser', $user);
        // session('test', $user);

        return $next($request);
    }

    protected function validateBearerToken(string $token): ApiUser|false
    {
        $client = new Client(['base_uri' => config('microservices.services.auth_service.host')]);

        try {
            $response = $client->request('GET', "/api/v1/me", [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => "Bearer $token"
                ]
            ]);


            $data = json_decode($response->getBody());

            return new ApiUser($data);

        } catch (\Exception $e) {
            Log::error($e);
        }

        return false;
    }
}
