<div class="header">
    <h1 class="title-site" onclick="window.location.href='/'">YourPDF <img class="icon-site" src="{{asset('imgs/icon-site2.gif')}}" alt=""></h1>

    <button class="btn-categorias ms-auto">
        <div class="row-btn row1"></div>
        <div class="row-btn row2"></div>
        <div class="row-btn row3"></div>
    </button>

    <nav class="box-links ms-auto">
            @auth 
               <div class="main-user">
                  <div class="box-img-menu">
                    <img class="img-menu" src="{{asset('imgs/logo-yourpdf.png')}}" alt="">
                  </div>  
                   <div class="main-btn-user">
                       <a class="btn-user btn-auth" href="#">Olá, {{auth()->user()->name}} ! <i class="icon" data-lucide="user-round-cog"></i><i class="icon" data-lucide="chevron-down"></i></a>
                       <div class="box-user" id="box-user">
                           <button onclick="window.location.href='/logout-user'">Sair <i class="icon" data-lucide="user-round-minus"></i></button>
                        </div>
                   </div>
                    <br>
                    @if (Request::is('/'))
                        <a class="btn-auth link-favoritos" href="/favoritos">Favoritos 
                            <i class="icon" data-lucide="heart"></i>
                        </a>
                    @elseif (Request::is('favoritos'))
                        <a class="btn-auth link-home" href="/">Home
                            <i class="icon" data-lucide="home"></i>
                        </a>
                    @endif
               </div>
            @endauth 
            @guest
              <div class="box-noauth">
                  <a href="/login">Entrar <i class="icon" data-lucide="user-round-check"></i></a>
                  <a href="{{route('createUser')}}">Cadastrar <i class="icon" data-lucide="user-plus"></i></a>
              </div>
            @endguest
    </nav>
</div>