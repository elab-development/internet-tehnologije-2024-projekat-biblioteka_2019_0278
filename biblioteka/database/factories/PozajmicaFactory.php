<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pozajmica>
 */
class PozajmicaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'knjiga_id' => \App\Models\Knjiga::factory(),
            'clan_id' => \App\Models\Clan::factory(),
            'datum_pozajmice' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'datum_vracanja' => $this->faker->dateTimeBetween('now', '+1 month'),
        ];
    }
}
