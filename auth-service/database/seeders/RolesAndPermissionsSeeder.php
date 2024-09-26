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
        Permission::create(['name' => 'update ip']);
        Permission::create(['name' => 'delete ip']);
        Permission::create(['name' => 'view any ip']);
        Permission::create(['name' => 'update any ip']);
        Permission::create(['name' => 'delete any ip']);

        // Create roles and assign permissions
        $user = Role::create(['name' => 'user', "guard_name" => "api"]);
        $user->givePermissionTo('create ip');
        $user->givePermissionTo('view ip');
        $user->givePermissionTo('update ip');
        $user->givePermissionTo('delete ip');
        $user->givePermissionTo('view any ip');

        $admin = Role::create(['name' => 'admin', "guard_name" => "api"]);
        $admin->givePermissionTo(Permission::all());

        $user = User::create([
            'name' => 'Admin',
            'email'=> 'admin@local.dev',
            'password' => bcrypt('123456')
        ]);

        $user->assignRole('admin');
    }
}
