<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use GuzzleHttp\Client;
use App\Classes\ApiUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthMiddleware
{
    /**
     * Check if request has valid auth token
     *
     * @param Request $request
     * @param Closure $next
     * @return Response
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

        return $next($request);
    }

    /**
     * validate the provided token
     *
     * @param string $token
     * @return ApiUser|false
     */
    protected function validateBearerToken(string $token): ApiUser|false
    {
        if (env('APP_ENV') == 'testing') {
            return $this->getDemoUserForTesting();
        }
    
        $client = new Client(['base_uri' => config('microservices.services.auth_service.host')]);

        try {
            $response = $client->request('GET', "/api/v1/me?" . env('APP_ENV'), [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => "Bearer $token"
                ]
            ]);

            $data = json_decode($response->getBody());

            return new ApiUser($data);
        } catch (Exception $e) {
            Log::error($e);
        }

        return false;
    }

    /**
     * Return dummy user in special need (testing)
     *
     * @return ApiUser
     */
    protected function getDemoUserForTesting(): ApiUser
    {
        return (new ApiUser())
            ->setId(1)
            ->setName('TestUser')
            ->setEmail('testuser@example.com')
            ->setRoles(['user'])
            ->setPermissions([
                'view ip',
                'create ip',
                'update ip',
            ]);
    }
}
