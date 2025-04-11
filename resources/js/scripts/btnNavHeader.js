$(document).ready(function(){
    $('.btn-categorias').on('click', function(e){
        e.stopPropagation()
        $('.box-links').toggleClass('box-links-active');
        $('.row1').toggleClass('row1-rotate');
        $('.row2').toggleClass('row2-hidden');
        $('.row3').toggleClass('row3-rotate');

    })
})