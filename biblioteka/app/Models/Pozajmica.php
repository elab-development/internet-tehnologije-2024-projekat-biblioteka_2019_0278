<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pozajmica extends Model
{
    /** @use HasFactory<\Database\Factories\PozajmicaFactory> */
    use HasFactory;
    protected $table = 'pozajmice';
    protected $fillable = [
        'id',
        'knjiga_id',
        'clan_id',
        'datum_pozajmice',
        'datum_vracanja'
    ];

    public function knjiga()
    {
        return $this->belongsTo(Knjiga::class, 'knjiga_id');
    }
}
