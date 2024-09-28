<?php

namespace App\Policies;

use App\Models\User;
use App\Classes\ApiUser;
use App\Models\AuditLog;
use Illuminate\Http\Request;

class AuditLogPolicy
{
    protected ApiUser $apiUser;

    public function __construct(Request $request)
    {
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
     * Determine whether the user can view any ip audit log.
     */
    public function viewAny(User $user): bool
    {
        return in_array('view any auditlog', $this->apiUser->permissions);
    }

    /**
     * Determine whether the user can view the audit log.
     */
    public function view(User $user, AuditLog $auditLog): bool
    {
        return in_array('view auditlog', $this->apiUser->permissions) && ($this->apiUser->id == $auditLog->modified_by);
    }
}
