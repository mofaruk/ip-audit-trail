<?php

namespace App\Models;

use Exception;
use Illuminate\Support\Facades\Log;
use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class IpAddress extends Model
{
    use HasFactory;

    protected $collection = 'ip_addresses';

    protected $fillable = [
        'ip',
        'label',
        'comment',
        'user_id',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function (IpAddress $ipAddress) {
            static::logIpChange($ipAddress, 'created');
        });

        static::updated(function (IpAddress $ipAddress) {
            static::logIpChange($ipAddress, 'updated');
        });

        static::deleted(function (IpAddress $ipAddress) {
            static::logIpChange($ipAddress, 'deleted');
        });
    }

    /**
     * Log changes of the IP
     *
     * @param IpAddress $ipAddress
     * @param string $event
     * @return AuditLog|false
     */
    protected static function logIpChange(IpAddress $ipAddress, string $event): AuditLog|false
    {
        if ($event === 'updated') {
            $changes = $ipAddress->getChanges();
            unset($changes['updated_at']);
        } else {
            $changes = $ipAddress->toArray();
        }
        
        try {
            $request = request();
            $apiUser = $request->attributes->get('apiUser');

            return AuditLog::create([
                'ip' => $ipAddress->ip,
                'modified_by' => $apiUser->id,
                'session_id' =>  $request->header('X-AT-Session') ?? session()->getId(),
                'event' => $event,
                'changes' => $changes,
            ]);
        } catch (Exception $ex) {
            Log::error($ex->getMessage(), $ex);
            return false;
        }
    }

}
