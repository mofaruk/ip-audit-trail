<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1/auth'], function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('password/forgot', [AuthController::class, 'forgotPassword'])->name('password.forgot');
    Route::post('password/reset', [AuthController::class, 'resetPassword'])->name('password.reset');
});
