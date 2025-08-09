<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\KnjigaController;
use App\Http\Controllers\API\PozajmicaController;
use App\Http\Controllers\API\ClanController;

Route::get('/knjige', [KnjigaController::class, 'index']);
Route::post('/vratiKnjigu/{id}', [PozajmicaController::class, 'vratiKnjigu'])->middleware('auth:sanctum');
Route::resource('/pozajmice', PozajmicaController::class)->middleware('auth:sanctum');


