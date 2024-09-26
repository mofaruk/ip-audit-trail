<?php

namespace App\Classes;

use InvalidArgumentException;
use stdClass;

class ApiUser
{
    public int $id;
    public string $name;
    public string $email;
    public array $roles;
    public array $permissions;

    /**
     * Create a new class instance.
     */
    public function __construct(stdClass $object = null)
    {
        if ($object->id ?? '') $this->setId($object->id);
        if ($object->name ?? '') $this->setName($object->name);
        if ($object->email ?? '') $this->setEmail($object->email);
        if ($object->roles ?? '') $this->setRoles($object->roles);
        if ($object->permissions ?? '') $this->setPermissions($object->permissions);
    }

    public function setId(int $id): ApiUser
    {
        $this->id = $id;
        return $this;
    }

    // Setter for $name
    public function setName(string $name): ApiUser
    {
        $this->name = $name;
        return $this;
    }

    // Setter for $email
    public function setEmail(string $email): ApiUser
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("Invalid email format.");
        }
        $this->email = $email;
        return $this;
    }

    // Setter for $roles
    public function setRoles(array $roles): ApiUser
    {
        $this->roles = $roles;
        return $this;
    }

    // Setter for $permissions
    public function setPermissions(array $permissions): ApiUser
    {
        $this->permissions = $permissions;
        return $this;
    }
}
