<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuditLogController;
use App\Http\Controllers\Api\IpAddressController;

Route::group(['prefix' => 'v1', 'middleware' => ['api.auth']], function() {
    Route::apiResource('ip', IpAddressController::class);
    Route::get('ip-audit', [AuditLogController::class, 'index']);
    Route::get('ip-audit/{id}', [AuditLogController::class, 'show']);
    Route::get('ip-audit/user/{user_id}', [AuditLogController::class, 'getLogByUser']);
    Route::get('ip-audit/ip/{ip}', [AuditLogController::class, 'getLogByIp']);
    Route::get('ip-audit/user/{user_id}/session/{session_id}', [AuditLogController::class, 'getLogByUserSession']);
    Route::get('ip-audit/user/{user_id}/ip/{ip}', [AuditLogController::class, 'getLogByUserIp']);
    Route::get('ip-audit/user/{user_id}/ip/{ip}/session/{session_id}', [AuditLogController::class, 'getLogByIpInSession']);
});
