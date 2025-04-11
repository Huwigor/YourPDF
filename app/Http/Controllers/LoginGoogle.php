<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class LoginGoogle extends Controller
{
    public function redirectToGoogle()
    {
       return Socialite::driver('google')->with(['prompt' => 'select_account'])->redirect(); 
    }

    public function handleGoogleCallback()
    {
       try{
          $user = Socialite::driver('google')->user();
          
          $login = User::where('email', $user->email)->first();

          if ($login){
            Auth::login($login);
            return redirect()->intended('/');
          } else {
            $newUser = User::create([
                'name' => $user->name,
                'email' => $user->email,
                'google_id' => $user->id,
                'password' => encrypt('123456dummy')
            ]);

            Auth::login($newUser);
            return redirect()->intended('/');       
          }
       } catch(\Throwable $e) {
        Log::error('Erro ao processar o login do Google:', [
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'trace' => $e->getTraceAsString()
        ]);
        return redirect('/login')->withErrors('Erro ao autenticar com o Google.');
       }
    }
}
