$(document).ready(function(){
    $('#loading-box').hide()
})

$("#form-login").submit(function (e) {
    e.preventDefault(); 
    $('#loading-box').show()

    let email = $("#email").val();
    let senha = $("#senha").val();
    let erroLogin = document.getElementById("erro-login-user");

    $.ajax({
        url: "/auth-user-login", 
        type: "POST",
        data: {
            _token: $('input[name="_token"]').val(),
            email: email,
            password: senha 
        },
        success: function (response) {
            if (response.success) {
                erroLogin.textContent = ""; 
                document.getElementById("form-login").reset();
                erroLogin.style.display = "none" 
                window.location.href = "/"; 
            } else {
                erroLogin.style.display = "block"
                erroLogin.textContent = response.message; 
            }
        },
        complete: function(){
            $('#loading-box').hide()
        },

        error: function (xhr) {
            console.log("Erro no login:", xhr.responseText);
            erroLogin.textContent = "Erro ao tentar logar. Verifique os dados e tente novamente.";
        }
    });
});
