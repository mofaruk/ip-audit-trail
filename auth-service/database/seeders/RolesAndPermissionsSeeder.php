<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        Permission::create(['name' => 'create ip']);
        Permission::create(['name' => 'view ip']);
        Permission::create(['name' => 'view all ip']);
        Permission::create(['name' => 'update ip']);
        Permission::create(['name' => 'delete ip']);

        // Create roles and assign permissions
        $user = Role::create(['name' => 'user']);
        $user->givePermissionTo('create ip');
        $user->givePermissionTo('view ip');
        $user->givePermissionTo('view all ip');
        $user->givePermissionTo('update ip');

        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        $user = User::create([
            'name' => 'Admin',
            'email'=> 'admin@local.dev',
            'password' => bcrypt('123456')
        ]);

        $user->assignRole('admin');
    }
}
