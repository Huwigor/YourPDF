<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorito;
use App\Models\User;
use App\Models\Pdf;

class Favoritos extends Controller
{
    public function showFavoritos(Request $request)
    {
        $userId = auth()->id();

        $pdfIds = Favorito::where('id_usuario', $userId)->pluck('id_pdf');

        $pdfs = Pdf::whereIn('id', $pdfIds)->get();

        if($request->ajax()){
            return response()->json($pdfs);
        }


        return view('pages.favoritos', compact('pdfs'));
    }

    

    public function deleteFavoritos(Request $request)
    {
        $userId = auth()->id();
        $pdfId = $request->id_pdf;

        $favorito = Favorito::where('id_usuario', $userId)
                            ->where('id_pdf', $pdfId)
                            ->first();

        if ($favorito) {
            $favorito->delete();
            return response()->json(['success' => true, 'message' => 'Favorito removido com sucesso.']);
        }

        return response()->json(['success' => false, 'message' => 'Favorito não encontrado.'], 404);
    }
}
