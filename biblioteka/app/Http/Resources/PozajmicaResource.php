<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\KnjigaResource;

class PozajmicaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'clan_id' => $this->clan_id,
            'knjiga_id' => $this->knjiga_id,
            'datum_pozajmice' => $this->datum_pozajmice,
            'datum_vracanja' => $this->datum_vracanja,
            'knjiga' => $this->knjiga ? new KnjigaResource($this->knjiga) : null,
        ];
    }
}
