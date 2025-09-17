<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Knjiga;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Knjiga>
 */
class KnjigaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naslov' => $this->faker->sentence(3),
            'pisac' => $this->faker->name(),
            'kolicina' => $this->faker->numberBetween(1, 100),
            'kategorija' => $this->faker->randomElement(Knjiga::getKategorijeValues()),
        ];
    }
}
