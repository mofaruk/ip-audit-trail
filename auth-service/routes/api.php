<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::group(['prefix' => 'v1'], function () {
    Route::get('me', [AuthController::class, 'me'])->middleware(['auth:api']);
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('logout', [AuthController::class, 'logout'])->middleware(['auth:api']);
    Route::post('refresh', [AuthController::class, 'refresh'])->middleware(['auth:api']);
    Route::post('password/forgot', [AuthController::class, 'forgotPassword'])->name('password.forgot');
    Route::post('password/reset', [AuthController::class, 'resetPassword'])->name('password.reset');
});
