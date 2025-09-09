<?php

namespace App\Http\Controllers\API;

use App\Models\Clan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ClanCollection;


class ClanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clanovi = Clan::all();
        return new ClanCollection($clanovi);
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
        $validated = $request->validate([
            'ime_prezime' => 'required|string|max:255',
            'email' => 'required|email|unique:clanovi,email',
            'user_id' => 'required|exists:users,id',
        ]);

        $clan = Clan::create($validated);

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
    public function update(Request $request, Clan $clanovi)
    {

        $validated = $request->validate([
            'ime_prezime' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:clanovi,email,' . $clanovi->id,
            'user_id' => 'sometimes|exists:users,id',
        ]);

        $clanovi->update($validated);

        return response()->json($clanovi, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Clan $clanovi)
    {
        $clanovi->delete();

        return response()->json([
            'message' => 'Član uspešno obrisan'
        ], 200);
    }
}
