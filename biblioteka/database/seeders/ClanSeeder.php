<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Clan;
use App\Models\User;

class ClanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Marko Markovic',
            'email' => 'marko@example.com',
            'password' => bcrypt('password123'),]);
        Clan::create(['id'=>1, 'ime_prezime'=>'Marko Markovic', 'email'=>'marko@example.com', 'user_id'=>1]);
    }
}
