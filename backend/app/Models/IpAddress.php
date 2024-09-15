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
     */
    protected static function logIpChange(IpAddress $ipAddress, $event)
    {
        if ($event === 'updated') {
            $changes = $ipAddress->getChanges();
            unset($changes['updated_at']);
        } else {
            $changes = $ipAddress->toArray();
        }
        
        try {
            AuditLog::create([
                'ip' => $ipAddress->ip,
                'modified_by' => 1,
                'session_id' => session()->getId(),
                'event' => $event,
                'changes' => $changes,
            ]);
        } catch (Exception $ex) {
            Log::error($ex->getMessage(), $ex);
        }
    }

}
