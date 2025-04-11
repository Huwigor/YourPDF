<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login</title>

    @vite('resources/css/loading-login.css')
    @vite('resources/js/scripts/loading.js')
    @vite('resources/js/app.js')
    @vite('resources/css/loading.css')
    @vite('resources/js/api/loginUser.js')
    @vite('resources/js/scripts/passwordHiddenRegister.js')
    @vite('resources/css/loginUser.css')

</head>
<body>

    <div id="loading">
        <div class="spinner"></div>
    </div>
    
    <img class="img-body" src="{{asset('imgs/icon-main8.avif')}}" alt="">
    <div class="overlay"></div>

    <header class="header">
        <h1 onclick="window.location.href='/'">YourPDF <img class="icon-title" src="{{asset('imgs/icon-site2.gif')}}" alt=""></h1>
    </header>

    <div class="d-flex main col-12">
        <div class="box-img-login">
           <img class="img-login" src="{{asset('imgs/tela-login.webp')}}" alt="">
        </div>
        <div class="box-form">
            <div id="loading-box">
                <div class="spinner"></div>
            </div>
            <form class="form-login" id="form-login"  method="POST">
                  @csrf
                  <div class="box-input">
                      <label for="email">Email</label>
                      <input class="mx-auto" type="text" name="email" id="email" placeholder="Digite seu email">
                  </div>
                  <div class="box-input">
                    <label for="senha">Senha</label>
                    <div class="box-input-password">
                        <input type="password" class="mx-auto inputs-hidden-pass1" id="senha" name="senha" placeholder="Digite sua senha">
                        <div class="box-icons">
                        <i class="icon open-eye1" data-lucide="eye"></i>
                        <i class="icon close-eye1 hidden-eye" data-lucide="eye-off"></i>
                        </div>
                    </div>
                 </div>
                 <p id="erro-login-user" class="mx-auto alert alert-danger"></p>
                 <div style="width:100%;display:flex;justify-content:center;">
                      <button type="submit" class="btn-login mx-auto">Entrar</button>
                 </div>
                 <p class="btn-google mx-auto" onclick="window.location.href='/auth/google/login'"><img class="icon-google" src="{{asset('imgs/icon-google.png')}}" alt="">Continue com o Google</p>
                 <p class="link-cadastro">Não possui uma conta? <a href="{{route('createUser')}}">Clique aqui</a> e cadastre-se! </p>
            </form>
        </div>
    </div>
    
</body>
</html>