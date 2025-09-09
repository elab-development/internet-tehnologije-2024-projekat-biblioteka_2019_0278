<?php


namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RezervacijaCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($rezervacija) {
            return [
                'id' => $rezervacija->id,
                'knjiga_id' => $rezervacija->knjiga_id,
                'clan_id' => $rezervacija->clan_id,
                'datum_rezervacije' => $rezervacija->datum_rezervacije,
                'pozajmica_id' => $rezervacija->pozajmica_id,
                'created_at' => $rezervacija->created_at,
                'updated_at' => $rezervacija->updated_at,
                'knjiga' => $rezervacija->knjiga ? [
                    'id' => $rezervacija->knjiga->id,
                    'naslov' => $rezervacija->knjiga->naslov,
                    'pisac' => $rezervacija->knjiga->pisac,
                ] : null,
            ];
        })->toArray();
    }
}