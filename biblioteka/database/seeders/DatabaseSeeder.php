<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Admin::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin123')]);

        User::create([
            'name' => 'Testni user',
            'email' => 'test@test.com',
            'password' => bcrypt('test123')]);

        $this->call([
            KnjigaSeeder::class,
            ClanSeeder::class,
            RezervacijaSeeder::class
        ]);
    }
}
