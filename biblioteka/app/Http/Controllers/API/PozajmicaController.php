<?php

namespace App\Http\Controllers\API;

use App\Models\Pozajmica;
use App\Models\Clan;
use App\Models\Knjiga;
use App\Http\Resources\PozajmicaCollection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;


class PozajmicaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clan_id = Clan::where('user_id', auth()->id())->value('id');
        if (!$clan_id) {
            return response()->json('Clan nije registrovan', 404);
        }
        $pozajmice = Pozajmica::with('knjiga')->where('clan_id',$clan_id)->get();
        return new PozajmicaCollection($pozajmice);
    }
    public function indexAdmin()
    {
       
        $pozajmice = Pozajmica::all();
        if ($pozajmice->isEmpty()) {
            return response()->json('Nema pozajmica', 404);
        }
        return response()->json($pozajmice);
    }
    public function prikaziPozajmiceZaClana(Request $request, $clan_id)
    {
       
        
       $pozajmice = Pozajmica::with('knjiga')->where('clan_id',$clan_id)->get();
        return new PozajmicaCollection($pozajmice);
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
            'id_knjige' => 'required|exists:knjige,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Knjiga sa datim ID ne postoji.',
                'errors' => $validator->errors()
            ], 422);
        }

     
         $clan_id = Clan::where('user_id', auth()->id())->value('id');
        if (!$clan_id) {
            return response()->json('Morate biti registrovani clan da biste pozajmili knjigu', 404);
        }

        $knjiga = Knjiga::find($request->id_knjige);
        if (!$knjiga || $knjiga->kolicina <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Nema dostupnih primeraka ove knjige.',
            ], 400);
        }

        $pozajmica = Pozajmica::create([
            'clan_id' => $clan_id,
            'knjiga_id' => $request->id_knjige,
            'datum_pozajmice' => now(),
            'datum_vracanja' => $request->return_date ? $request->return_date : null,
        ]);

        $knjiga->kolicina -= 1;
        $knjiga->save();

        return response()->json($pozajmica, 201);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function storeAdmin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_knjige' => 'required|exists:knjige,id',
             'id_clana' => 'required|exists:clanovi,id',
        ]);
        

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Neispravni podaci.',
                'errors' => $validator->errors()
            ], 422);
        }


        $knjiga = Knjiga::find($request->id_knjige);
        if (!$knjiga || $knjiga->kolicina <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Nema dostupnih primeraka ove knjige.',
            ], 400);
        }

        $pozajmica = Pozajmica::create([
            'clan_id' => $request->id_clana,
            'knjiga_id' => $request->id_knjige,
            'datum_pozajmice' => now(),
            'datum_vracanja' => $request->return_date ? $request->return_date : null,
        ]);

        $knjiga->kolicina -= 1;
        $knjiga->save();

        return response()->json($pozajmica, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pozajmica $pozajmica)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pozajmica $pozajmica)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pozajmica $pozajmica)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pozajmica $pozajmica)
    {
        //
    }

    public function vratiKnjigu(Request $request, $id)
    {
        $pozajmica = Pozajmica::find($id);
        if (!$pozajmica) {
            return response()->json('Pozajmica sa datim ID ne postoji', 404);
        }
        if ($pozajmica->datum_vracanja!=null) {
            return response()->json('Knjiga je vec vracena', 404);
        }

        $knjiga = Knjiga::find($pozajmica->knjiga_id);
        if ($knjiga) {
            $knjiga->kolicina += 1;
            $knjiga->save();
        }

        $pozajmica->datum_vracanja = now();
        $pozajmica->save();
        return response()->json('Knjiga uspesno vracena', 200);
    }
}
