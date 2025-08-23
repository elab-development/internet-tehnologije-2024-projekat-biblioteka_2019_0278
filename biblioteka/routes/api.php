<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\KnjigaController;
use App\Http\Controllers\API\PozajmicaController;
use App\Http\Controllers\API\ClanController;
use App\Http\Controllers\API\RezervacijaController;

Route::get('/knjige', [KnjigaController::class, 'index']);
Route::get('/knjige/{id}', [KnjigaController::class, 'show'])->middleware('auth:sanctum');


Route::post('/vratiKnjigu/{id}', [PozajmicaController::class, 'vratiKnjigu'])->middleware('auth:admin-api');
Route::resource('/pozajmice', PozajmicaController::class)->middleware('auth:sanctum');
Route::post('/rezervacije', [RezervacijaController::class, 'store'])->middleware('auth:sanctum');
Route::get('/rezervacije', [RezervacijaController::class, 'rezervacijeZaClana'])->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/admin/knjige', [KnjigaController::class, 'store'])->middleware('auth:admin-api');
Route::resource('/admin/clanovi', ClanController::class)->middleware('auth:admin-api');
Route::post('/admin/pozajmice', [PozajmicaController::class, 'storeAdmin'])->middleware('auth:admin-api');
Route::get('/admin/pozajmice', [PozajmicaController::class, 'indexAdmin'])->middleware('auth:admin-api');
Route::get('/admin/clanovi/{clan_id}/pozajmice', [PozajmicaController::class, 'prikaziPozajmiceZaClana'])->middleware('auth:admin-api');
Route::post('/admin/logout', [AuthController::class, 'logout'])->middleware('auth:admin-api');
Route::post('/admin/login', [AuthController::class, 'loginAdmin']);
Route::resource('/admin/rezervacije', RezervacijaController::class)->middleware('auth:admin-api');
Route::post('/admin/potvrdiRezervaciju/{id}', [RezervacijaController::class, 'potvrdiRezervaciju'])->middleware('auth:admin-api');
