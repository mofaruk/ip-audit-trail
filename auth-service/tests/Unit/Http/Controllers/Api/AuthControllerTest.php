<?php

namespace Tests\Unit\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Password;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Setup up pre-configurations
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    /**
     * Test user registration.
     *
     * @return void
     */
    public function test_user_can_register()
    {
        $response = $this->postJson('/api/v1/register', [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['user', 'token']);
    }

    /**
     * Test user login.
     *
     * @return void
     */
    public function test_user_can_login()
    {
        $user = User::factory()->create([
            'email' => 'testuser2@example.com',
            'password' => bcrypt('password')
        ]);

        $response = $this->postJson('/api/v1/login', [
            'email' => 'testuser2@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['token']);
    }

    /**
     * Test getting authenticated user details.
     *
     * @return void
     */
    public function test_authenticated_user_can_get_profile()
    {
        $user = User::factory()->create();
        $token = auth()->tokenById($user->id);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
                         ->getJson('/api/v1/me');

        $response->assertStatus(200)
                 ->assertJsonStructure(['id', 'name', 'email', 'roles', 'permissions']);
    }

    /**
     * Test token refresh.
     *
     * @return void
     */
    public function test_token_can_be_refreshed()
    {
        $user = User::factory()->create();
        $token = auth()->tokenById($user->id);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
                         ->postJson('/api/v1/refresh');

        $response->assertStatus(200)
                 ->assertJsonStructure(['token']);
    }

    /**
     * Test forgot password functionality.
     *
     * @return void
     */
    public function test_user_can_request_password_reset_link()
    {
        $user = User::factory()->create([
            'email' => 'testuser3@example.com'
        ]);

        $response = $this->postJson('/api/v1/password/forgot', [
            'email' => 'testuser3@example.com'
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Reset link sent to your email.']);
    }

    /**
     * Test password reset functionality.
     *
     * @return void
     */
    public function test_user_can_reset_password()
    {
        $user = User::factory()->create([
            'email' => 'testuser4@example.com'
        ]);

        $token = Password::createToken($user);

        $response = $this->postJson('/api/v1/password/reset', [
            'email' => 'testuser4@example.com',
            'token' => $token,
            'password' => 'newpassword',
            'password_confirmation' => 'newpassword',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Password successfully reset.']);
    }
}
