<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Knjiga extends Model
{
    /** @use HasFactory<\Database\Factories\KnjigaFactory> */
    use HasFactory;
    protected $table = 'knjige'; 
    protected $fillable = [
        'id',
        'naslov',
        'pisac',
        'kolicina'

    ];

    public function pozajmice()
    {
        return $this->hasMany(Pozajmica::class, 'knjiga_id');
    }
}
