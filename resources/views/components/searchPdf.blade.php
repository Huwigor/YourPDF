<div class="main-search">
<div class="input-box mx-auto">
        <input type="text" name="busca" id="busca" placeholder="Digite aqui o PDF que procura..">
        <i id="btn-search" class="icon-search" data-lucide="search"></i>
    </div>
    @if(auth()->check())
      <input type="hidden" class="id-user" id="id-user" value="{{auth()->user()->id}}">
      <input type="hidden" class="name-user" id="name-user" value="{{auth()->user()->name}}">
    @endif
    <div class="col-sm-12 col-md-12 col-12 box-pdfs flex-wrap mx-auto">
    <div id="loading-box">
        <div class="spinner-box"></div>
    </div>
      
        
    </div>
    <div class="overflow"></div>
    <div class="detalhes-pdf">

    </div>
</div>