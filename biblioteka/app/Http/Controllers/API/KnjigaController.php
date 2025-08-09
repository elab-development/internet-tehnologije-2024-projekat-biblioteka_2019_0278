<?php

namespace App\Http\Controllers\API;

use App\Models\Knjiga;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\KnjigaCollection;;


class KnjigaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $titleQuery = request()->titleQuery;
        if(!$titleQuery) {
        return Knjiga::paginate(5);

        }
        $knjiga = Knjiga::where('naslov', 'like', '%' . $titleQuery . '%')->get();
        if($knjiga->isEmpty()) {
            return response()->json('Ne postoji knjiga sa naslovom po datom kriterijumu.', 404);
        }
        return new KnjigaCollection($knjiga);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         $book = Book::create([
            'id'=>$request->id,
            'naslov'=>$request->naslov,
            'pisac'=>$request->pisac,
            'kolicina'=>$request->kolicina
        ]);
        

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'naslov' => 'required|string|max:255',
            'pisac' => 'required|string|max:255',
            'kolicina' => 'required|integer|min:1',
        ]);

        $knjiga = Knjiga::create([
            'naslov' => $request->naslov,
            'pisac' => $request->pisac,
            'kolicina' => $request->kolicina,
        ]);

        return response()->json(['message' => 'Knjiga uspešno dodata', 'knjiga' => $knjiga], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Knjiga $knjiga)
    {
        $knjiga = Knjiga::find($id);
        if(is_null($knjiga)) {
            return response()->json('Data not found', 404);
        }
        return new KnjigaResource($knjiga);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Knjiga $knjiga)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Knjiga $knjiga)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Knjiga $knjiga)
    {
        //
    }
}
