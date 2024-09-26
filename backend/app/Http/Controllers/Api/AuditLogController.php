<?php

namespace App\Http\Controllers\Api;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Gate;

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
        if(!Gate::check('view', new AuditLog)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

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
        if(!Gate::check('view', new AuditLog)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

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
        if(!Gate::check('view', new AuditLog)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

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
        if(!Gate::check('view', new AuditLog)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

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
        if(!Gate::check('view', new AuditLog)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

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
        if(!Gate::check('view', new AuditLog)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

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
        if(!Gate::check('view', new AuditLog)) {
            return $this->sendApiResponse(['error' => 'Unauthorized access'], 401);
        }

        $ip = str_replace('_', '.', $ip);
        $logs = AuditLog::where('modified_by', $userId)
            ->where('ip', $ip)
            ->where('session_id', $sessionId)
            ->get();
        return $this->sendApiResponse($logs);
    }
}
