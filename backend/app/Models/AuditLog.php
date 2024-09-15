<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AuditLog extends Model
{
    use HasFactory;

    protected $collection = 'audit_logs';

    protected $fillable = [
        'ip',
        'modified_by',
        'session_id',
        'event',
        'changes',
    ];
}
