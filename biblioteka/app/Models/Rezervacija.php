<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rezervacija extends Model
{
    /** @use HasFactory<\Database\Factories\RezervacijaFactory> */
    use HasFactory;
    protected $table = 'rezervacije';
    protected $fillable = [
        'id',
        'knjiga_id',
        'clan_id',
        'datum_rezervacije',
        'pozajmica_id'
    ];

    public function knjiga()
        {
            return $this->belongsTo(Knjiga::class, 'knjiga_id');
        }

    public function pozajmica(){
        return $this->belongsTo(Pozajmica::class, 'pozajmica_id');
    }

    public function clan()
        {
            return $this->belongsTo(Clan::class, 'clan_id');
        }
}
