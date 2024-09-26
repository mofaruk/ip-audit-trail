<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends ApiBaseController
{
    /**
     * Register an user, return response with auth token
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|confirmed|string|min:6',
        ]);

        if ($validator->fails()) {
            return $this->sendResponse($validator->errors(), 400);
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $user->assignRole('user');

            $token = JWTAuth::fromUser($user);
        } catch (Exception $ex) {
            Log::info($ex);
            return $this->sendResponse(['error' => 'Something went wrong'], 500);
        }

        return $this->sendResponse(compact('user', 'token'), 201);
    }

    /**
     * Validate user crendential and login an user in the system
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendResponse($validator->errors(), 400);
        }

        $credentials = $request->only('email', 'password');

        try {
            if (!JWTAuth::attempt($credentials)) {
                return $this->sendResponse(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return $this->sendResponse(['error' => 'Could not create token'], 500);
        }

        $user = auth()->user();
        $token = JWTAuth::claims([
            'id'   => $user->id,
            'name' => $user->name,
            'role' => $user->role,
        ])
            ->attempt($credentials);

        return $this->sendResponse(compact('token'));
    }

    /**
     * Logout an user and destroy the auth token
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->logout(true);
        return $this->sendResponse(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh expires auth token with a new token
     *
     * @return JsonResponse
     */
    public function refresh(): JsonResponse
    {
        try {
            if (!$token = auth()->refresh(true, true)) {
                return $this->sendResponse(['error' => 'Cannot validate current token'], 401);
            }
        } catch (JWTException $e) {
            return $this->sendResponse(['error' => 'Could not refresh token'], 500);
        }

        return $this->sendResponse(compact('token'));
    }

    /**
     * Send details of an authenticated user
     *
     * @return JsonResponse
     */
    public function me(): JsonResponse
    {

        try {
            $user =  auth()->user()->toArray();
            $user['roles'] = auth()->user()->getRoleNames();
            $user['permissions'] = auth()
                ->user()
                ->getAllPermissions()
                ->pluck('name');
        } catch (Exception $ex) {
            Log::error($ex);
            return $this->sendInternalErrorResponse();
        }
        return $this->sendResponse($user);
    }

    /**
     * Send a password reset email to users email if user rfogets the password
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return $this->sendResponse($validator->errors(), 400);
        }

        try {
            $status = Password::sendResetLink($request->only('email'));
        } catch (Exception $ex) {
            Log::error($ex);
            return $this->sendInternalErrorResponse();
        }

        return $status === Password::RESET_LINK_SENT
            ? $this->sendResponse(['message' => 'Reset link sent to your email.'])
            : $this->sendResponse(['message' => 'Unable to send reset link'], 500);
    }

    /**
     * Reset password using the token received via email
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function resetPassword(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->sendResponse($validator->errors(), 400);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            $user = User::where('email', $request->email)->first();
            $token = auth()->login($user);

            return $this->sendResponse([
                'message' => 'Password successfully reset.',
                'token' => $token
            ]);
        }

        return $this->sendResponse(['message' => 'Invalid token or email.'], 400);
    }
}
