<div class="header">
    <h1 class="title-site" onclick="window.location.href='/'">YourPDF <img class="icon-site" src="{{asset('imgs/icon-site2.gif')}}" alt=""></h1>
    <nav class="nav-links ms-auto">
        @auth 
           <div class="main-user">
               <a href="/favoritos">Favoritos <i class="icon" data-lucide="heart"></i></a>
               <a id="btn-user" href="#">Olá, {{auth()->user()->name}} ! <i class="icon" data-lucide="user-round-cog"></i></a>
               <div class="box-user" id="box-user">
                  <button onclick="window.location.href='/logout-user'">Sair <i class="icon" data-lucide="user-round-minus"></i></button>
               </div>
           </div>
        @endauth 
        @guest
          <div>
              <a href="/login">Entrar <i class="icon" data-lucide="user-round-check"></i></a>
              <a href="{{route('createUser')}}">Cadastrar <i class="icon" data-lucide="user-plus"></i></a>
          </div>
        @endguest
    </nav>
</div>