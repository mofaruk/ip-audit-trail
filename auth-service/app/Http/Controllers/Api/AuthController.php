<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|confirmed|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
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
            return response()->json(['error' => 'Something went wrong'], 500);
        }

        return response()->json(compact('user', 'token'), 201);
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $credentials = $request->only('email', 'password');

        try {
            if (!JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        $user = auth()->user();
        $token = JWTAuth::claims([
            'id'   => $user->id,
            'name' => $user->name,
            'role' => $user->role,
        ])
        ->attempt($credentials);

        return response()->json(compact('token'));
    }

    public function logout()
    {
        auth()->logout(true);
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        try {
            if (! $newToken = JWTAuth::refresh(JWTAuth::getToken())) {
                return response()->json(['error' => 'Invalid token'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not refresh token'], 500);
        }

        return response()->json(compact('newToken'));
    }

    public function me() {

        try {
            $user =  auth()->user()->toArray();

            $user['roles'] = auth()->user()->getRoleNames();
            $user['permissions'] = auth()
                ->user()
                ->getAllPermissions()
                ->pluck('name');
        } catch (Exception $ex) {
            Log::error($ex);
            response()->json(['error' => 'Something went wrong', 500]);
        }
        return response()->json($user);
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Reset link sent to your email.'])
            : response()->json(['message' => 'Unable to send reset link'], 500);
    }

    // Reset password using the token received via email
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
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

            return response()->json([
                'message' => 'Password successfully reset.',
                'token' => $token
            ]);
        }

        return response()->json(['message' => 'Invalid token or email.'], 400);
    }
}
