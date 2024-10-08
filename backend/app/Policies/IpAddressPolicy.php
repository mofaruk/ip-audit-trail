<?php

namespace App\Policies;

use App\Models\User;
use App\Classes\ApiUser;
use App\Models\IpAddress;
use Illuminate\Http\Request;

class IpAddressPolicy
{
    protected ApiUser $apiUser;

    public function __construct(Request $request) {
        $this->apiUser = $request->attributes->get('apiUser');
    }

    /**
     * Perform pre-authorization checks.
     */
    public function before(?User $user, string $ability): bool|null
    {
        if (in_array('admin', $this->apiUser->roles)) {
            return true;
        }
    
        return null;
    }

    /**
     * Determine whether the user can view the IP Address.
     */
    public function view(?User $user, IpAddress $ipAddress): bool
    {
        return in_array('view ip', $this->apiUser->permissions) && ($this->apiUser->id == $ipAddress->user_id);
    }

    /**
     * Determine whether the user can view any IP Address.
     */
    public function viewAny(?User $user): bool
    {
        return in_array('view any ip', $this->apiUser->permissions);
    }

    /**
     * Determine whether the user can create IP Address.
     */
    public function create(?User $user): bool
    {
        return in_array('create ip', $this->apiUser->permissions);
    }

    /**
     * Determine whether the user can update the IP Address.
     */
    public function update(?User $user, IpAddress $ipAddress): bool
    {
        return in_array('update ip', $this->apiUser->permissions) && ($this->apiUser->id == $ipAddress->user_id);
    }

    /**
     * Determine whether the user can update any IP Address.
     */
    public function updateAny(?User $user): bool
    {
        return in_array('update any ip', $this->apiUser->permissions);
    }

    /**
     * Determine whether the user can delete the IP Address.
     */
    public function delete(?User $user, IpAddress $ipAddress): bool
    {
        return in_array('delete ip', $this->apiUser->permissions) && ($this->apiUser->id == $ipAddress->user_id);
    }

    /**
     * Determine whether the user can delete the IP Address.
     */
    public function deleteAny(?User $user): bool
    {
        return in_array('delete any ip', $this->apiUser->permissions);
    }
}
