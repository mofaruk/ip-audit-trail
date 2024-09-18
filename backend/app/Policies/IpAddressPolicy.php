<?php

namespace App\Policies;

use App\Models\IpAddress;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class IpAddressPolicy
{
    /**
     * Perform pre-authorization checks.
     */
    public function before(User $user, string $ability): bool|null
    {
        if (request()->header('X-Auth-User-Role') === 'admin') {
            return true;
        }
    
        return null;
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, IpAddress $ipAddress): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, IpAddress $ipAddress): bool
    {
        return request()->header('X-Auth-User-Id') == $ipAddress->user_id; 
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, IpAddress $ipAddress): bool
    {
        return false;
    }
}
