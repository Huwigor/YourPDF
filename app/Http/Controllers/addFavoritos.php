<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Favorito;

class addFavoritos extends Controller
{
    public function storeFavoritos(Request $request){

        $request->validate([
            'id_pdf' => 'required|integer',
            'id_usuario' => 'required|integer',
            'detalhes' => 'required|string' 
        ]);

        $favoritos = new Favorito();
        $favoritos->id_pdf = $request->id_pdf;
        $favoritos->id_usuario = $request->input('id_usuario');
        $favoritos->detalhes = $request->detalhes;

      
        if(Favorito::where('id_pdf', $request->id_pdf)->exists()){
            
            return response()->json([
                'success' => false,
                'message' => 'Já foi adicionado aos favoritos!'
            ]);
        }

        $favoritos->save();

        return response()->json(['success' => true, 'message' => 'adicionado com sucesso aos favoritos!']);

    }
}
