<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clan extends Model
{
    /** @use HasFactory<\Database\Factories\ClanFactory> */
    use HasFactory;
    protected $table = 'clanovi';
    protected $fillable = [
        'id',
        'ime_prezime',
        'email',
        'user_id'
        
    ];

    public function pozajmice()
    {
        return $this->hasMany(Pozajmica::class, 'clan_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
