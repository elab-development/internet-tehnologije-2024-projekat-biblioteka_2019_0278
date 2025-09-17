<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\KnjigaController;
use App\Http\Controllers\API\PozajmicaController;
use App\Http\Controllers\API\ClanController;
use App\Http\Controllers\API\RezervacijaController;

Route::get('/knjige/kategorije', [KnjigaController::class, 'getKategorije']);
Route::get('/knjige', [KnjigaController::class, 'index']);
Route::get('/knjige/{knjiga}', [KnjigaController::class, 'show']);


Route::get('/pozajmice', [PozajmicaController::class, 'index'])->middleware('auth:sanctum');
Route::post('/rezervacije', [RezervacijaController::class, 'kreirajRezervacijuZaUlogovanogClana'])->middleware('auth:sanctum');
Route::get('/rezervacije', [RezervacijaController::class, 'rezervacijeZaClana'])->middleware('auth:sanctum');
Route::delete('/rezervacije/{id}', [RezervacijaController::class, 'destroyZaClana'])->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::prefix('admin')->middleware('auth:admin-api')->group(function () {
    Route::post('/knjige', [KnjigaController::class, 'store']);
    Route::patch('/knjige/{knjiga}', [KnjigaController::class, 'update']);
    Route::resource('/clanovi', ClanController::class);
    Route::get('/clanovi/{clan_id}/pozajmice', [PozajmicaController::class, 'prikaziPozajmiceZaClana']);
    Route::get('/clanovi/{clan_id}/rezervacije', [RezervacijaController::class, 'prikaziRezervacijeZaClana']);
    Route::post('/vratiKnjigu/{id}', [PozajmicaController::class, 'vratiKnjigu']);
    Route::get('/pozajmice', [PozajmicaController::class, 'indexAdmin']);
    Route::get('/pozajmice/{pozajmica}', [PozajmicaController::class, 'show']);
    Route::post('/pozajmice', [PozajmicaController::class, 'store']);
    Route::delete('/pozajmice/{pozajmica}', [PozajmicaController::class, 'destroy']);
    Route::resource('/rezervacije', RezervacijaController::class);
    Route::post('/potvrdiRezervaciju/{id}', [RezervacijaController::class, 'potvrdiRezervaciju']);
    Route::post('/logout', [AuthController::class, 'logout']);

});
Route::post('admin/login', action: [AuthController::class, 'loginAdmin']);
