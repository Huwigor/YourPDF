

$(document).ready(function(){

    $('.btn-user').on('click', function(e){
        e.stopPropagation()
        $('.box-user').toggleClass('box-user-active');
    })

    $(document).on('click', function(e){
        e.stopPropagation()
        $('.box-user').removeClass('box-user-active');
    })
})