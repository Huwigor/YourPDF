<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">

        <title>Home</title>
    </head>
    @vite('resources/js/app.js')
    @vite('resources/css/loading.css')
    @vite('resources/css/app.css')
    @vite('resources/js/scripts/loading.js')
    @vite('resources/js/scripts/btnNavHeader.js')
    @vite('resources/css/header.css')
    @vite('resources/css/footer.css')
    @vite('resources/css/searchPdf.css')
    @vite('resources/css/loading-box.css')
    @vite('resources/js/api/searchPdfs.js')

     
    @if (auth()->check())
       @vite('resources/js/scripts/box-user-header.js')
    @endif

    <style>
        body{
            position: relative;
        }
        .overflow-img{
            position:fixed;
            min-height:100vh;
            min-width: 100vw;
            z-index: -1;
            background-color: rgba(0, 0, 0, 0.9)
        }
        .img-fundo-site{
            position:fixed;
            min-height:100vh;
            min-width: 100vw;
            z-index: -2;
        }
    </style>

    <body>


    <div id="loading">
        <div class="spinner"></div>
    </div>

    <div class="overflow-img"></div>
    <img class="img-fundo-site" src="{{asset('imgs/icon-main8.avif')}}" alt="">

    @include('components.header')

    @include('components.searchPdf')

    @include('components.footer')
        
    </body>
</html>
