<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\EnviarEmail;

class EnviarPdfEmail extends Controller
{
    public function enviarPdfEmail(Request $request){

        $request->validate([
            'nome' => 'required|string',
            'email' => 'required|string',
            'pdf' => 'required|string'
        ]);

       
        $dados = [
            'email' => $request-> email,
            'nome' => $request-> nome,
            'pdf' => $request-> pdf
        ];

        EnviarEmail::dispatch($dados);

        return response()->json(['message' => 'Pdf enviado com sucesso!']);


    }
}
