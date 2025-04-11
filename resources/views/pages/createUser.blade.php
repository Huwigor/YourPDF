<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Registro</title>
    @vite('resources/css/loading.css')
    @vite('resources/js/scripts/loading.js')
    @vite('resources/js/app.js')
    @vite('resources/css/userRegister.css')
    @vite('resources/js/api/createUser.js')
    @vite('resources/js/scripts/passwordHiddenRegister.js')
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

    <div class="d-flex container-fluid">
        <div class="box-txt">
             <img class="img-login" src="{{asset('imgs/login2.webp')}}" alt="">
        </div>
        <div class="box-form">
            <form action="" method="POST" id="form-create-user">
                @csrf
                 <div class="box-input">
                    <label for="usuario">Usuario</label>
                    <input type="text" id="usuario" name="usuario" placeholder="Digite seu usuario">
                    <p id="erro-user" class="erros-input"></p>
                 </div>
                 <div class="box-input">
                    <label id="label-email" for="email">Email</label>
                    <input type="text" id="email" name="email" placeholder="Digite seu email">
                    <p id="erro-email" class="erros-input"></p>
                 </div>
                 <div class="box-input">
                    <label for="senha">Senha</label>
                    <div>
                        <input type="password" class="inputs-hidden-pass1" id="senha" name="senha" placeholder="Digite sua senha">
                        <div class="box-icons">
                        <i class="icon open-eye1" data-lucide="eye"></i>
                        <i class="icon close-eye1 hidden-eye" data-lucide="eye-off"></i>
                        </div>
                    </div>
                    <p id="erro-senha" class="erros-input"></p>
                 </div>
                 <div class="box-input">
                    <label for="confirm-senha">Repita sua Senha</label>
                    <input type="password" id="confirm-senha" class="inputs-hidden-pass2" name="confirm-senha" placeholder="Digite sua senha novamente">
                    <div class="box-icons">
                        <i class="icon open-eye2" data-lucide="eye"></i>
                        <i class="icon close-eye2 hidden-eye" data-lucide="eye-off"></i>
                    </div>
                    <p id="erro-repeat" class="erros-input"></p>
                 </div>
                 <p id="erro-create-user" class="alert alert-danger"></p>
                 <button class="mx-auto text-center btn-registro" type="submit">Registrar</button>
                 <div class="text-center box-btn-google">
                    <p class="btn-google" onclick="window.location.href='{{route('google-create-user')}}'">Continuar com Google <img src="{{asset('imgs/icon-google.png')}}" alt=""></p>
                 </div>
                 <div class="box-link-login">
                     <p class="link-login">Cadastrado? Entre em sua conta clicando <a href="/login">aqui!</a></p>
                 </div>
            </form>
        </div>
    </div>


</body>
</html>
