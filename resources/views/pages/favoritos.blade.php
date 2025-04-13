<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Favoritos</title>

    @vite('resources/js/app.js')
    @vite('resources/css/header.css')
    @vite('resources/css/loading.css')
    @vite('resources/css/app.css')
    @vite('resources/css/favoritos.css')
    @vite('resources/css/footer.css')
    @vite('resources/js/scripts/loading.js')
    @vite('resources/js/scripts/btnNavHeader.js')
    @vite('resources/js/scripts/box-user-header.js')
    @vite('resources/js/api/render-favoritos.js')
    @vite('resources/css/loading-box.css')
</head>
<body>


    <div id="loading">
        <div class="spinner"></div>
    </div>

    <img class="img-body" src="{{asset('imgs/icon-main8.avif')}}" alt="">
    <div class="overlay"></div>


    @include('components.header')

    <div class="main-favoritos col-md-12 mx-auto flex-wrap">
    <div id="loading-box">
        <div class="spinner"></div>
    </div>
    </div>

    <div class="overflow"></div>
    <div class="main-detalhes">
        <div class="detalhes"></div>
    </div>



    @include('components.footer')
    
</body>
</html>