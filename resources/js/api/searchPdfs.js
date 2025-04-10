$(document).ready(function () {

    let favoritos = [] 

    $.ajax({
        url: "/verify-favoritos",
        type: "GET",
        success: function(response){
            console.log(response)
            favoritos = response.map(id=> Number(id));        
        },
        error: function(){
            console.error("erro ao buscar os favoritos");
        }
        
    });



    $(document).on('click', '.btn-enviar-email', function () {
        let boxInputEmail = $(this).closest('.box-input-email');
    
    let email = boxInputEmail.find('.enviar-email').val();
    let idUser = $('#name-user').val();
    let urlPdf = boxInputEmail.find('.input-arquivo').val();
    let responseElement = boxInputEmail.find('.response');

    if (!validateEmail(email)) {
        responseElement.text('Formato de email inválido!').css('color', 'red');
        return;
    }
    
    
        let pedido = new FormData()
        pedido.append('email', email)
        pedido.append('nome', idUser)
        pedido.append('pdf', urlPdf)

        responseElement.text('Enviando...').css('color', 'blue');
    
        $.ajax({
            url: "/enviar-email",
            type: "POST",
            data: pedido,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                    responseElement.text(response.message).css('color', 'green');             
            },
            error: function (xhr) {
                let errorMessage = 'Erro ao enviar e-mail';
                if (xhr.responseJSON) {
                    errorMessage = xhr.responseJSON.message || xhr.responseJSON.error || JSON.stringify(xhr.responseJSON);
                }
                responseElement.text(errorMessage).css('color', 'red');
            }
        });
    });


    function validateEmail(email) {
        let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(email);
    }



    // RENDERIZA OS PDFS INICIALMENTE

    function renderPDFs(data) {
        let boxPdfs = $('.box-pdfs');
        boxPdfs.html(`
            <div class="pagination-container d-flex justify-content-center align-items-center mt-3 box-pagination">
                <button id="prevPage" class="btn btn-dark mx-3 btn-pagination" disabled> <span class="icon-pagination"> < </span></button>
                <span id="pageInfo"></span>
                <button id="nextPage" class="btn btn-dark mx-3 btn-pagination"><span class="icon-pagination"> > </span></button>
            </div>
        `);

        if (data.length > 0) {
            $.each(data, function (index, pdf) {
                let nomeLimitado = pdf.nome.length > 20 ? pdf.nome.substring(0, 20) + '...' : pdf.nome;
                let userId = Number($('#id-user').val()) || null;
                let idPdf = pdf.id || null;
                let detalhesPdf = pdf.detalhes || null;

                let isFavorito = favoritos.includes(idPdf);

                let btnFavoritos = userId 
                ? isFavorito
                
                        ? `<button class="btn-favorito-true"> <img src="imgs/heart.png" /></button>`

                        :
                            ` <button class="btn-add-favoritos" data-idpdf="${idPdf}" data-detalhes="${detalhesPdf}" title="Adicionar aos favoritos"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-cart">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            </button> ` 
                        : 
                            `<button onclick="window.location.href='/login'" title="Adicionar aos favoritos" class="btn-add-favoritos" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-cart">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg></button>`
                        ;

                boxPdfs.append(`
                    <div class="pdf-item col-12 col-md-3 col-lg-12">
                        <div class="box-img">
                            <button class="btn-info" data-detalhe="${pdf.detalhes}" data-nome="${pdf.nome}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-info">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg></button>
                            <img class="img-pdf" src="/imgs/pdf2.png" />
                        </div>
                        <p class="text-center nome-pdf">${nomeLimitado}</p>

                        <div class="d-flex box-icons-cart">
                            <button class="btn-share" title="Compartilhar"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-cart">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                            </svg></button>
                            <div class="box-share">
                              <button class="btn-share-zap">Compartilhar com <img class="icon-share-zap" src="imgs/icon-zap.png" /></button>
                              <div class="main-envio-email">
                                  <button class="btn-email">Enviar para Email <img class="icon-share-email" src="imgs/icon-email.png" /></button>    
                              </div>
                            </div>

                            <button class="btn-baixar-pdf" data-url="${pdf.arquivo}" title="Baixar PDF"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-cart">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg></button>

                            ${btnFavoritos}
                        </div>

                        <input type="hidden" value="${pdf.id}" class="pdf-id">            
                        <input type="hidden" value="${pdf.nome}" class="pdf-nome">
                        <input type="hidden" value="${pdf.imagem}" class="pdf-imagem"> 
                        <input type="hidden" value="${pdf.detalhes}" class="pdf-detalhes">
                        <input type="hidden" value="${pdf.arquivo}" class="pdf-arquivo">  

                        <div class="main-input-email">
                            <div class="box-input-email ">
                            <button class="ms-auto btn-close-email"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-close-email">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg></button>
                            <p>Envie o PDF para o email que quiser..</p>
                            <input type="text" class="enviar-email" name="enviar-email" placeholder="Email.." />
                            <input type="hidden" class="input-arquivo" value="${pdf.arquivo}">
                            <p class="response"></p>  
                            <button class="btn btn-sm btn-primary btn-enviar-email">Enviar</button>
                            </div>
                        </div>
                    </div>
                `);
            });

            setupPagination();
        } else {
            boxPdfs.html('<p>Nenhum PDF encontrado.</p>');
        }
    }







   // ABRE A BOX DE COMPARTILHAMENTO

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





    // COMPARTILHAMENTO COM O WHATSAPP
    $(document).on('click', '.btn-share-zap', function(e) {
        e.preventDefault();
        
        let pdfUrl = $(this).closest('.pdf-item').find('.pdf-arquivo').val();
        let pdfNome = $(this).closest('.pdf-item').find('.pdf-nome').val();
        
        if (!pdfUrl) {
            alert("Erro: O PDF não possui um link válido.");
            return;
        }
    
        let mensagem = `Confira este PDF: ${pdfNome}%0A${pdfUrl}`;
        let whatsappUrl = `https://wa.me/?text=${mensagem}`;
    
        window.open(whatsappUrl, '_blank');
    });


    $(document).on('click', '.btn-email', function(e){
        e.stopPropagation()
        $('.overflow').toggleClass('overflow-active');
        $(this).closest('.box-icons-cart').nextAll('.main-input-email').first().toggleClass('box-input-active');
    });

    $(document).on('click', '.btn-close-email', function(e){
        e.stopPropagation()
        $('.overflow').toggleClass('overflow-active');
        $(this).closest('.main-input-email').toggleClass('box-input-active');
    });
  






      // FUNÇÃO PARA ADICIONAR AOS FAVORITOS

      $(document).on('click', '.btn-add-favoritos', function () {
        let pdfId = $(this).data('idpdf');
        let pdfDetalhes = $(this).data('detalhes');
        let userId = $('#id-user').val(); 

        console.log(pdfId, userId)
    
        let btnFavoritos = $(this);
        let pdfItem = btnFavoritos.closest('.pdf-item');
    
        if (!pdfId) {
            console.error("ID do PDF não encontrado!");
            return;
        }
    
        $.ajax({
            url: '/add-favoritos',
            method: 'POST',
            data: {
                id_pdf: pdfId,
                id_usuario: userId,
                detalhes: pdfDetalhes,
                _token: $('meta[name="csrf-token"]').attr('content') 
            },
            success: function (response) {
                if (response.success) {
                    btnFavoritos.addClass('icon-cart-active');
                   
    
                } else {
                    console.log('Erro ao tentar adicionar aos favoritos!');
                }
            },
            error: function () {
                alert("Erro ao adicionar aos favoritos. Tente novamente.");
            }
        });
    });







    // FUNÇÃO DE PAGINAÇÃO DOS PDFS

    function setupPagination() {
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

            $("#pageInfo").text(`Página ${page} de ${totalPages}`);
            $("#prevPage").prop("disabled", page === 1);
            $("#nextPage").prop("disabled", page === totalPages);
        }

        $("#prevPage").off("click").on("click", function () {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });

        $("#nextPage").off("click").on("click", function () {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });

        showPage(currentPage);
    }







    // FUNÇÃO DE BUSCA 

    let debounceTimer;

    function fetchPDFs(query = "") {
        let url = query.trim() ? "/search-pdf" : "/pdf-home";
        let data = query.trim() ? { busca: query } : {};
        $('#loading-box').show();
        $('.spinner-box').addClass('spinner-box-active')

        $.ajax({
            url: url,
            type: "GET",
            data: data,
            success: function(response){
                renderPDFs(response)
            },
            complete: function(){
                $('.spinner-box').remove('spinner-box-active')
                $('#loading-box').hide();
            } 
            
        });
    }

    fetchPDFs();



    $('#busca').on('keyup', function () {
        let query = $(this).val().trim();
        
        clearTimeout(debounceTimer); 
        
        debounceTimer = setTimeout(() => {
            fetchPDFs(query);
        }, 300); 
       
    });







    // FUNÇÃO QUE MOSTRA OS DETALHES


    $(document).on('click', '.btn-info', function () {
        console.log('btn clicado')
        let nome = $(this).attr('data-nome');
        let detalhestxt = $(this).attr('data-detalhe');
 


        let detalhes = `
            <div class=" col-10 text-center box-detalhes">
                <div class="box-btn-fechar">
                    <button class="btn-fechar ms-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 icon-fechar">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg></button>              
                </div>    
                <img class="img-detalhe" src="/imgs/pdf.png" alt="" style="max-width: 100%; height: auto;">
                <h3 class="nome-detalhe">${nome}</h3>
                <div class="box-desc mx-auto">
                <p class="detalhes-txt">${detalhestxt}</p>
                </div>
            </div>
        `;

        $('.detalhes-pdf').html(detalhes);
        $('.overflow').addClass('overflow-active');
        $('.detalhes-pdf').addClass('detalhes-pdf-active');

        $('.btn-fechar').on('click', function(){
            $('.overflow').removeClass('overflow-active');
            $('.detalhes-pdf').removeClass('detalhes-pdf-active');
        });
    });






    // FUNÇÃO PARA BAIXAR O PDF

    $(document).on('click', '.btn-baixar-pdf', function (e) {

        e.preventDefault()

        if($(event.target).closest('.btn-baixar-pdf').length){

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
        }

    });





  

    
    
});
