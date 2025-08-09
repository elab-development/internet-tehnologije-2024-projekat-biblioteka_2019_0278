<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\KnjigaController;
use App\Http\Controllers\API\PozajmicaController;
use App\Http\Controllers\API\ClanController;

Route::get('/knjige', [KnjigaController::class, 'index']);
Route::get('/knjige/{id}', [KnjigaController::class, 'show'])->middleware('auth:sanctum');


Route::post('/vratiKnjigu/{id}', [PozajmicaController::class, 'vratiKnjigu'])->middleware('auth:sanctum');
Route::resource('/pozajmice', PozajmicaController::class)->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/admin/knjige', [KnjigaController::class, 'store'])->middleware('auth:admin-api');
Route::resource('/admin/clanovi', ClanController::class)->middleware('auth:admin-api');
Route::post('/admin/pozajmice', [PozajmicaController::class, 'storeAdmin'])->middleware('auth:admin-api');
Route::get('/admin/pozajmice', [PozajmicaController::class, 'indexAdmin'])->middleware('auth:admin-api');
Route::post('/admin/logout', [AuthController::class, 'logout'])->middleware('auth:admin-api');
Route::post('/admin/login', [AuthController::class, 'loginAdmin']);