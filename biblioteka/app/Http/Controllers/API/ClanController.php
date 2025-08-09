<?php

namespace App\Http\Controllers\API;

use App\Models\Clan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class ClanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clanovi = Clan::all();
        return response()->json($clanovi);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $clan = Clan::create([
            'ime_prezime' => $request->ime_prezime,
            'email' => $request->email,
            'user_id' => $request->user_id
        ]);

        return response()->json($clan, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Clan $clan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Clan $clan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Clan $clan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Clan $clan)
    {
        //
    }
}
