<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Knjiga;

class KnjigaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Knjiga::create(['id'=>123,'naslov'=>'Umece ratovanja','pisac'=>'Sun Tzu', 'kolicina' => 5]);
        Knjiga::create(['id'=>124,'naslov'=>'Zlocin i kazna','pisac'=>'Fjodor Dostojevski', 'kolicina' => 5]);
        Knjiga::create(['id'=>125,'naslov'=>'Mali princ','pisac'=>'Antoan de Sent Egziperi','kolicina' => 5 ]);
        Knjiga::factory()->count(10)->create();
    }
}
