<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PozajmicaCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
           return $this->collection->map(function ($pozajmica) {
            return [
                'id' => $pozajmica->id,
                'knjiga_id' => $pozajmica->knjiga_id,
                'clan_id' => $pozajmica->clan_id,
                'datum_pozajmice' => $pozajmica->datum_pozajmice,
                'datum_vracanja' => $pozajmica->datum_vracanja,
                'created_at' => $pozajmica->created_at,
                'updated_at' => $pozajmica->updated_at,             
                'knjiga' => $pozajmica->knjiga ? [
                    'id' => $pozajmica->knjiga->id,
                    'naslov' => $pozajmica->knjiga->naslov,
                    'pisac' => $pozajmica->knjiga->pisac,
                ] : null,
            ];
        })->toArray();
    }
}
