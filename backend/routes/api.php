<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\IpAddressController;

Route::group(['prefix' => 'v1'], function() {
    Route::apiResource('ip', IpAddressController::class);
});
