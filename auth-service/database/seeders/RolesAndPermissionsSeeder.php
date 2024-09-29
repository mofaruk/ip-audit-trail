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
        Permission::firstOrCreate(['name' => 'create ip']);
        Permission::firstOrCreate(['name' => 'view ip']);
        Permission::firstOrCreate(['name' => 'update ip']);
        Permission::firstOrCreate(['name' => 'delete ip']);
        Permission::firstOrCreate(['name' => 'view any ip']);
        Permission::firstOrCreate(['name' => 'update any ip']);
        Permission::firstOrCreate(['name' => 'delete any ip']);

        // Create roles and assign permissions
        $user = Role::firstOrCreate(['name' => 'user', "guard_name" => "api"]);
        $user->givePermissionTo('create ip');
        $user->givePermissionTo('view ip');
        $user->givePermissionTo('update ip');
        $user->givePermissionTo('delete ip');
        $user->givePermissionTo('view any ip');

        $admin = Role::firstOrCreate(['name' => 'admin', "guard_name" => "api"]);
        $admin->givePermissionTo(Permission::all());

        $user = User::firstOrCreate([
            'name' => 'Admin',
            'email'=> 'admin@local.dev',
        ], [
            'password' => bcrypt('123456')
        ]);

        $user->assignRole('admin');
    }
}
