document.addEventListener('DOMContentLoaded', function(){

    const btnUser = document.getElementById('btn-user');
    const boxUser = document.getElementById('box-user');

    btnUser.addEventListener('click', function(e){
        e.stopPropagation()
         boxUser.classList.toggle('box-user-active');
    });

    document.addEventListener('click', function(e){
        e.stopPropagation()
        boxUser.classList.remove('box-user-active');
    });

});