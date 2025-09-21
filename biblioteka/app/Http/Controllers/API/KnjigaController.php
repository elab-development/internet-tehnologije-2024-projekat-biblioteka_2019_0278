<?php

namespace App\Http\Controllers\API;

use App\Models\Knjiga;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\KnjigaCollection;
;
use App\Http\Resources\KnjigaResource;


class KnjigaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $titleQuery = request()->titleQuery;
        $kategorija = request()->kategorija;
        $sortOrder = request()->sortOrder;
        $perPage = 5;


        $query = Knjiga::query();
        if ($titleQuery) {
            $query->where('naslov', 'like', '%' . $titleQuery . '%');
        }

        if ($kategorija) {
            $query->where('kategorija', $kategorija);
        }

        if ($sortOrder) {
            $query->orderBy('kolicina', $sortOrder);
        }

        $paginated = $query->paginate($perPage);

        if ($paginated->isEmpty()) {
            return response()->json('Ne postoji knjiga po datom kriterijumu.', 404);
        }

        return new KnjigaCollection($paginated);
    }

    public function getKategorije()
    {
        return response()->json([
            'kategorije' => Knjiga::getKategorijeValues()
        ]);
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
        $request->validate([
            'naslov' => 'required|string|max:255',
            'pisac' => 'required|string|max:255',
            'kolicina' => 'required|integer|min:1',
            'kategorija' => 'required|in:' . implode(',', Knjiga::getKategorijeValues()),
        ]);

        $knjiga = Knjiga::create([
            'naslov' => $request->naslov,
            'pisac' => $request->pisac,
            'kolicina' => $request->kolicina,
            'kategorija' => $request->kategorija,
        ]);

        return response()->json(['message' => 'Knjiga uspešno dodata', 'knjiga' => $knjiga], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Knjiga $knjiga)
    {

        if (is_null($knjiga)) {
            return response()->json('Tražena knjiga nije pronađena', 404);
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
        $validatedData = $request->validate([
            'naslov' => 'sometimes|required|string|max:255',
            'pisac' => 'sometimes|required|string|max:255',
            'kolicina' => 'sometimes|required|integer|min:0',
        ]);


        $knjiga->update($validatedData);
        return response()->json([
            'message' => 'Knjiga je uspešno ažurirana.',
            'knjiga' => $knjiga
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Knjiga $knjiga)
    {
        if (!$knjiga) {
            return response()->json(['message' => 'Knjiga nije pronađena.'], 404);
        }

        $knjiga->delete();

        return response()->json(['message' => 'Knjiga je uspešno obrisana.'], 200);
    }
}
