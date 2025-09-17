<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Rezervacija;
use App\Models\Knjiga;
use App\Models\Clan;
use App\Models\Pozajmica;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\RezervacijaCollection;
use App\Http\Resources\RezervacijaResource;

class RezervacijaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rezervacije = Rezervacija::with(['knjiga', 'clan', 'pozajmica'])->get();
        return new RezervacijaCollection($rezervacije);
    }

    public function rezervacijeZaClana(Request $request)
    {
        $clan_id = Clan::where('user_id', auth()->id())->value('id');
        if (!$clan_id) {
            return response()->json('Clan nije registrovan', 404);
        }
        $rezervacije = Rezervacija::with(['knjiga', 'clan', 'pozajmica'])->where('clan_id', $clan_id)->get();
        return new RezervacijaCollection($rezervacije);
    }

    public function prikaziRezervacijeZaClana(Request $request, $clan_id)
    {


        $rezervacije = Rezervacija::with(['knjiga', 'clan', 'pozajmica'])->where('clan_id', $clan_id)->get();
        return new RezervacijaCollection($rezervacije);

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
        $validator = Validator::make($request->all(), [
            'knjiga_id' => 'required|exists:knjige,id',
            'clan_id' => 'required|exists:clanovi,id',
            'pozajmica_id' => 'nullable|exists:pozajmice,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (Rezervacija::where('clan_id', $request->clan_id)->where('knjiga_id', $request->knjiga_id)->whereNull('pozajmica_id')->exists()) {
            return response()->json(['error' => 'Već postoji rezervacija za ovu knjigu koja nije potvrđena.'], 409);
        }

        $rezervacija = Rezervacija::create([
            'knjiga_id' => $request->knjiga_id,
            'clan_id' => $request->clan_id,
            'datum_rezervacije' => now(),
            'pozajmica_id' => $request->pozajmica_id
        ]);

        return response()->json(new RezervacijaResource($rezervacija), 201);
    }

    public function kreirajRezervacijuZaUlogovanogClana(Request $request)
    {
        $clan_id = Clan::where('user_id', auth()->id())->value('id');
        if (!$clan_id) {
            return response()->json('Morate biti ulogovani da biste napravili rezervaciju', 404);
        }




        $validator = Validator::make($request->all(), [
            'knjiga_id' => 'required|exists:knjige,id'

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (Rezervacija::where('clan_id', $clan_id)->where('knjiga_id', $request->knjiga_id)->whereNull('pozajmica_id')->exists()) {
            return response()->json(['error' => 'Već postoji rezervacija za ovu knjigu koja nije potvrđena.'], 409);
        }
        $rezervacija = Rezervacija::create([
            'knjiga_id' => $request->knjiga_id,
            'clan_id' => $clan_id,
            'datum_rezervacije' => now()
        ]);

        return response()->json(new RezervacijaResource($rezervacija), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $rezervacija = Rezervacija::with(['knjiga', 'clan', 'pozajmica'])->find($id);
        if (!$rezervacija) {
            return response()->json(['error' => 'Rezervacija nije pronađena.'], 404);
        }
        return new RezervacijaResource($rezervacija);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $rezervacija = Rezervacija::find($id);
        if (!$rezervacija) {
            return response()->json(['error' => 'Rezervacija nije pronađena.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'knjiga_id' => 'sometimes|exists:knjige,id',
            'clan_id' => 'sometimes|exists:clanovi,id',
            'datum_rezervacije' => 'sometimes|date',
            'pozajmica_id' => 'nullable|exists:pozajmice,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $rezervacija->update($request->only(['knjiga_id', 'clan_id', 'datum_rezervacije', 'pozajmica_id']));

        return response()->json(new RezervacijaResource($rezervacija), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rezervacija = Rezervacija::find($id);
        if (!$rezervacija) {
            return response()->json(['error' => 'Rezervacija nije pronađena.'], 404);
        }

        if ($rezervacija->pozajmica_id) {
            return response()->json([
                'error' => 'Nije moguće obrisati rezervaciju koja je već potvrđena.'
            ], 409);
        }

        $rezervacija->delete();

        return response()->json(['message' => 'Rezervacija uspešno obrisana.'], 200);
    }

    public function destroyZaClana(string $id)
    {
        $rezervacija = Rezervacija::find($id);
        if (!$rezervacija) {
            return response()->json(['error' => 'Rezervacija nije pronađena.'], 404);
        }

        $clan_id = Clan::where('user_id', auth()->id())->value('id');
        if (!$clan_id || $rezervacija->clan_id != $clan_id) {
            return response()->json(['error' => 'Nemate dozvolu da obrišete ovu rezervaciju.'], 403);
        }

        if ($rezervacija->pozajmica_id) {
            return response()->json([
                'error' => 'Nije moguće obrisati rezervaciju koja je već potvrđena.'
            ], 409);
        }

        $rezervacija->delete();

        return response()->json(['message' => 'Rezervacija uspešno obrisana.'], 200);
    }

    public function potvrdiRezervaciju(Request $request, $id)
    {
        $rezervacija = Rezervacija::find($id);
        if (!$rezervacija) {
            return response()->json(['error' => 'Rezervacija nije pronađena.'], 404);
        }

        if ($rezervacija->pozajmica_id) {
            return response()->json(['error' => 'Rezervacija je već vezana za pozajmicu.'], 400);
        }

        $knjiga = Knjiga::find($rezervacija->knjiga_id);
        if (!$knjiga) {
            return response()->json(['error' => 'Knjiga nije pronađena.'], 404);
        }
        if ($knjiga->kolicina <= 0) {
            return response()->json(['error' => 'Nema dostupnih primeraka ove knjige.'], 400);
        }

        $pozajmica = Pozajmica::create([
            'knjiga_id' => $rezervacija->knjiga_id,
            'clan_id' => $rezervacija->clan_id,
            'datum_pozajmice' => now(),
            'datum_vracanja' => null,
        ]);

        $knjiga->kolicina -= 1;
        $knjiga->save();

        $rezervacija->pozajmica_id = $pozajmica->id;
        $rezervacija->save();

        return response()->json([
            'message' => 'Rezervacija je uspešno konvertovana u pozajmicu.',
            'rezervacija' => $rezervacija,
            'pozajmica' => $pozajmica
        ], 201);
    }
}
