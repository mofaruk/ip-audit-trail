<?php

namespace App\Http\Controllers\Api;

use App\Models\AuditLog;

class AuditLogController extends BaseController
{
    /**
     * Display a listing of all IP log
     *
     * @param void
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $logs = AuditLog::latest()->get();
        return $this->sendApiResponse($logs);
    }

    /**
     * Display specified IP log
     *
     * @param integer $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $logs = AuditLog::where('id', $id)->first();
        return $this->sendApiResponse($logs);
    }

    /**
     * Display a listing of the IP change log by user 
     *
     * @param integer $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLogByUser(int $userId)
    {
        $logs = AuditLog::where('modified_by', $userId)->get();
        return $this->sendApiResponse($logs);
    }

    /**
     * Display a listing of the IP change log by user session 
     *
     * @param integer $userId
     * @param string $sessionId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLogByUserSession(int $userId, string $sessionId)
    {
        $logs = AuditLog::where('modified_by', $userId)
            ->where('session_id', $sessionId)
            ->get();
        return $this->sendApiResponse($logs);
    }

    /**
     * Display a listing of the IP change log by user 
     *
     * @param string $ip
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLogByIp(string $ip)
    {
        $ip = str_replace('_', '.', $ip);
        $logs = AuditLog::where('ip', $ip)->get();
        return $this->sendApiResponse($logs);
    }

    /**
     * Display a listing of the IP change log by ip (dot should be replaced with underscore) 
     *
     * @param integer $userId
     * @param string $ip
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLogByUserIp(int $userId, string $ip)
    {
        $ip = str_replace('_', '.', $ip);
        $logs = AuditLog::where('modified_by', $userId)
            ->where('ip', $ip)
            ->get();
        return $this->sendApiResponse($logs);
    }

    /**
     * Display a listing of the IP change log by ip (dot should be replaced with underscore)
     * and session 
     *
     * @param integer $userId
     * @param string $ip
     * @param string $sessionId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLogByIpInSession(int $userId, string $ip, string $sessionId)
    {
        $ip = str_replace('_', '.', $ip);
        $logs = AuditLog::where('modified_by', $userId)
            ->where('ip', $ip)
            ->where('session_id', $sessionId)
            ->get();
        return $this->sendApiResponse($logs);
    }
}
