<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    protected function sendApiResponse(mixed $data, $httpStatusCode = 200)
    {
        return response()->json($data, $httpStatusCode);
    }
}
