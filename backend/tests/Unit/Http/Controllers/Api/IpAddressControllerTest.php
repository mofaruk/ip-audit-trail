<?php

namespace Tests\Unit;

use App\Models\IpAddress;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Tests\TestCase;

class IpAddressControllerTest extends TestCase
{
    // use RefreshDatabase;

    /**
     * Setup up pre-configurations
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
        Gate::before(function() {
            return true;
        });
    }

    public function test_it_can_store_an_ip_address()
    {
        $data = [
            'ip'      => '127.0.0.1',
            'label'   => 'Test',
            'comment' => 'Test network IP',
            'user_id' => 1,
        ];

        $response = $this->postJson('/api/v1/ip', $data);

        $response->assertStatus(201);

        $this->assertDatabaseHas('ip_addresses', $data);
    }

    public function test_it_can_show_an_ip_address()
    {
        $ipAddress = IpAddress::factory()->create();

        $response = $this->getJson("/api/v1/ip/{$ipAddress->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'id' => $ipAddress->id,
                     'ip' => $ipAddress->ip,
                     'label' => $ipAddress->label,
                     'comment' => $ipAddress->comment,
                     'user_id' => $ipAddress->user_id,
                 ]);
    }

    public function test_it_can_update_an_ip_address()
    {
        $ipAddress = IpAddress::factory()->create();

        $updatedData = [
            'ip' => '10.0.0.1',
            'label' => 'Test2',
            'comment' => 'Test2 network IP',
            'user_id' => $ipAddress->user_id, 
        ];

        $response = $this->putJson("/api/v1/ip/{$ipAddress->id}", $updatedData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('ip_addresses', $updatedData);
    }

    public function test_it_can_delete_an_ip_address()
    {
        $ipAddress = IpAddress::factory()->create();

        $response = $this->deleteJson("/api/v1/ip/{$ipAddress->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('ip_addresses', ['id' => $ipAddress->id]);
    }

    public function test_it_can_list_all_ip_addresses()
    {
        $ipAddresses = IpAddress::factory()->count(5)->create();

        $response = $this->getJson('/api/v1/ip');

        $response->assertStatus(200); 
    }
}
