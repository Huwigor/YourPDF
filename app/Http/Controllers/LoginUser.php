<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class LoginUser extends Controller
{
    public function LoginAuth(Request $request){
        try {
            $request->validate([
                'email' => 'string|required',
                'password' => 'string|required' 
            ]);
    
            $user = User::where('email', $request->email)->first();
    
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email ou Senha inválidos!'
                ]);   
            }
    
            Auth::login($user);
            return response()->json([
                'success' => true,
                'message' => 'Login realizado com sucesso!'
            ]);
    
        } catch (\Exception $e) {
            Log::error('Erro no login: ' . $e->getMessage(), [
                'exception' => $e,
                'stack' => $e->getTraceAsString(),
                'input' => $request->all() 
            ]);
            return response()->json(['success' => false, 'message' => 'Erro ao tentar o login'], 500);
        }
    }
    
}
