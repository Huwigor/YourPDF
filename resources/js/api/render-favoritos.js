$(document).ready(function(){

    $.ajax({
        url: "/favoritos",
        type: "GET",
        success: function (data) {
            let boxFavoritos = $('.main-favoritos');
                boxFavoritos.html(` <div class="pagination-container d-flex justify-content-center align-items-center mt-3 box-pagination">
                    <button id="prevPage" class="btn btn-dark mx-3 btn-pagination" disabled><span class="span-arrow"> < </span></button>
                    <span id="pageInfo"></span>
                    <button id="nextPage" class="btn btn-dark mx-3 btn-pagination"><span class="span-arrow"> > </span></button>
                    </div>`);

            if (data.length > 0) {
                $.each(data, function (index, pdf) {


                    boxFavoritos.append(`
                        <div class="col-md-4 pdf-item favoritos mx-auto">
                            <div class="box-img">
                                 <button class="btn-detalhes" data-nome="${pdf.nome}" data-detalhes="${pdf.detalhes}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-close">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg></button>
                                <img class="img-pdf" src="imgs/pdf2.png" />
                            </div>
                            <p class="text-center nome-pdf">${pdf.nome.length > 20 ? pdf.nome.substring(0, 20) + '...' : pdf.nome}</p>
                            <div class="box-btn-pdf">

                                <button class="btn-share" title="Compartilhar"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-favoritos">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg></button>
                                <div class="box-share">
                                    <button class="btn-share-zap" data-arquivo="${pdf.arquivo}" data-nome="${pdf.nome}">Compartilhar com <img class="icon-share-zap" src="imgs/icon-zap.png" /></button>
                                    <div class="main-envio-email">
                                        <button class="btn-email">Enviar para Email <img class="icon-share-email" src="imgs/icon-email.png" /></button>      
                                    </div>
                                </div>

                                <button class="btn-baixar" data-url="${pdf.arquivo}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-favoritos">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                </button>
                                <button class="btn-remover-favorito" data-pdfId="${pdf.id}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-favoritos">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                </button>
                            </div>  

                            <div class="main-input-email">
                            <div class="box-input-email ">
                            <button class="ms-auto btn-close-email"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-close-email">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg></button>
                            <p>Envie o PDF para o email que quiser..</p>
                            <input type="text" class="enviar-email" name="enviar-email" placeholder="Email.." />
                            <input type="hidden" class="input-arquivo" value="${pdf.arquivo}">
                            <button class="btn btn-sm btn-primary btn-enviar-email">Enviar</button>
                            </div>
                        </div>

                        </div>
                    `);

                });





                // MOSTRA A BOX DE DETALHES DO PDF CLICADO

                $(document).on('click', '.btn-detalhes', function(e){
                    let pdfNome = $(this).data('nome')
                    let pdfDetalhes = $(this).data('detalhes')

                    let detalhes = 
                        `<div class=" col-10 text-center box-detalhes">
                            <div class="box-btn-fechar">
                                <button class="btn-fechar ms-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-fechar">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg></button>              
                            </div>    
                            <img class="img-detalhe" src="/imgs/pdf.png" alt="" style="max-width: 100%; height: auto;">
                            <h3 class="nome-detalhe">${pdfNome}</h3>
                            <div class="box-desc mx-auto">
                            <p class="detalhes-txt">${pdfDetalhes}</p>
                            </div>
                        </div>`

                    $('.detalhes').html(detalhes)
                    $('.overflow').addClass('overflow-active');
                    $('.detalhes').addClass('detalhes-active');

                    $('.btn-fechar').on('click', function(){
                        $('.overflow').removeClass('overflow-active');
                        $('.detalhes').removeClass('detalhes-active');
                    });


                })





                // FUNÇÃO PARA ABRIR BOX DE COMPARTILHAMENTO

                $(document).on('click', '.btn-share', function(e) {
                    e.stopPropagation(); 
            
                    let boxShare = $(this).siblings('.box-share');
                    let btnShare = $(this);
            
                    $('.box-share').not(boxShare).removeClass('box-share-active');
                    $('.btn-share').not(btnShare).removeClass('btn-share-active');
            
                    boxShare.toggleClass('box-share-active');
                    btnShare.toggleClass('btn-share-active');
                });
            
                $(document).on('click', function(e) {
                    if (!$(e.target).closest('.box-share, .btn-share').length) {
                        $('.box-share').removeClass('box-share-active'); 
                        $('.btn-share').removeClass('btn-share-active'); 
                    }
                });





               // ABRIR BOX DO INPUT DE EMAIL

                $(document).on('click', '.btn-email', function(e){
                    e.stopPropagation()
                    $('.overflow').toggleClass('overflow-active');
                    $(this).closest('.box-btn-pdf').nextAll('.main-input-email').first().toggleClass('box-input-active');
                });
            
                $(document).on('click', '.btn-close-email', function(e){
                    e.stopPropagation()
                    $('.overflow').toggleClass('overflow-active');
                    $(this).closest('.main-input-email').toggleClass('box-input-active');
                });


                
                // FUNÇÃO PARA REMOVER OS FAVORITOS

                $(document).on('click', '.btn-remover-favorito', function() {
                    let btn = $(this); 
                    let pdfItem = btn.closest('.favoritos');
                    let pdfId = btn.attr('data-pdfId');

                    console.log(pdfId)
                    
                    if (!confirm('Tem certeza que deseja remover este favorito?')) {
                        return;
                    }
                
                    btn.prop('disabled', true);
                    
                    $.ajax({
                        url: "/delete-favoritos",
                        type: "POST",
                        data: { 
                            id_pdf: pdfId, 
                            _token: $('meta[name="csrf-token"]').attr('content'),
                            _method: 'DELETE' 
                        },
                        success: function(response) {
                            if (response.success) {
                                pdfItem.fadeOut(300, function() { 
                                    $(this).remove();
                                    $(document).trigger('favoritos:updated');
                                });
                            } else {
                                alert(response.message);
                                btn.prop('disabled', false);
                            }
                        },
                        error: function() {
                            alert("Erro ao remover favorito.");
                            btn.prop('disabled', false);
                        }
                    });
                });









                // FUNÇÃO DE DOWNLOAD DO PDF
           
                $(document).on('click', '.btn-baixar', function () {
                    let pdfUrl = $(this).data('url');
            
                    if (pdfUrl) {
                        let link = document.createElement('a');
                        link.href = `/${pdfUrl}`;
                        link.download = '';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else {
                        alert("Erro ao tentar baixar o PDF.");
                    }
                });








                // PAGINAÇÃO DOS PDFS

                const itemsPerPage = 8;
                let currentPage = 1;
                const pdfItems = document.querySelectorAll(".pdf-item");
                const totalPages = Math.ceil(pdfItems.length / itemsPerPage);
            
                function showPage(page) {
                    const start = (page - 1) * itemsPerPage;
                    const end = start + itemsPerPage;
            
                    pdfItems.forEach((item, index) => {
                        item.style.display = index >= start && index < end ? "block" : "none";
                    });
            
                    document.getElementById("pageInfo").textContent = `Página ${page} de ${totalPages}`;
            
                    document.getElementById("prevPage").disabled = page === 1;
                    document.getElementById("nextPage").disabled = page === totalPages;
                    }
                
                    document.getElementById("prevPage").addEventListener("click", function () {
                        if (currentPage > 1) {
                            currentPage--;
                            showPage(currentPage);
                        }
                    });
                
                    document.getElementById("nextPage").addEventListener("click", function () {
                        if (currentPage < totalPages) {
                            currentPage++;
                            showPage(currentPage);
                        }
                    });
                
                    showPage(currentPage);

                } else {
                    boxFavoritos.html('<p>Nenhum PDF encontrado.</p>');
                }
            }
        });








     // COMPARTILHAMENTO COM O WHATSAPP

     $(document).on('click', '.btn-share-zap', function(e) {
        e.preventDefault();
        
        let pdfUrl = $(this).data('arquivo');
        let pdfNome = $(this).data('nome');
        
    
        let mensagem = `Confira este PDF: ${pdfNome}%0A${pdfUrl}`;
        let whatsappUrl = `https://wa.me/?text=${mensagem}`;
    
        window.open(whatsappUrl, '_blank');
    });






   
});