<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Knjiga extends Model
{

    protected const KATEGORIJE_ENUM = [
        'Fikcija',
        'Filozofija',
        'Klasici',
        'Decije',
        'Ostalo'

    ];

    /** @use HasFactory<\Database\Factories\KnjigaFactory> */
    use HasFactory;
    protected $table = 'knjige';
    protected $fillable = [
        'id',
        'naslov',
        'pisac',
        'kolicina',
        'kategorija'

    ];

    public function pozajmice()
    {
        return $this->hasMany(Pozajmica::class, 'knjiga_id');
    }


    public static function getKategorijeValues()
    {
        return self::KATEGORIJE_ENUM;
    }


}
