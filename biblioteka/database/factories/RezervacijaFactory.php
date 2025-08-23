<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Knjiga;
use App\Models\Clan;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rezervacija>
 */
class RezervacijaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'knjiga_id' => Knjiga::inRandomOrder()->first()?->id ?? Knjiga::factory()->create()->id,
            'clan_id' => Clan::inRandomOrder()->first()?->id ?? Clan::factory()->create()->id,
            'datum_rezervacije' => $this->faker->date(),
            'pozajmica_id' => null, // By default, not tied to a Pozajmica
        ];
    }
}
