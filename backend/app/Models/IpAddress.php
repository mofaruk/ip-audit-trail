<?php

namespace App\Models;

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

}
