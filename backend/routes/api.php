<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/hello', function (Request $request) {
    return response()->json([
        'message' => 'Hi, api is working',
        'staus' => '200',
    ]);
});


