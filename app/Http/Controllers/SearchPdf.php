<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pdf;
use App\Models\Favorito;

class SearchPdf extends Controller
{
    public function allPdf(Request $request){

        return response()->json(Pdf::all());

    }


    public function searchAllPdf(Request $request) {
        $query = $request->input('busca');

        if ($query) {
            $pdf = Pdf::where('nome', 'LIKE', "%$query%")
                     ->orWhere('categoria', 'LIKE', "%$query%")
                     ->get();
        } else {
            $pdf = Pdf::all();
        }

        if ($request->ajax()) {
            return response()->json($pdf);
        }

        return view('welcome', compact('pdf'));
    }

    public function verifyFavoritos(Request $request){

        $idUser = auth()->id();

        $favoritos = Favorito::where('id_usuario', $idUser)->pluck('id_pdf')->toArray();

        return response()->json($favoritos);
    }
}
