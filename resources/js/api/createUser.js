document.getElementById('form-create-user').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let usuario = document.getElementById('usuario').value.trim();
    let email = document.getElementById('email').value.trim();
    let senha = document.getElementById('senha').value.trim();
    let confirmSenha = document.getElementById('confirm-senha').value.trim();


    document.querySelectorAll('.erros-input').forEach(el => el.textContent = '');
    document.querySelectorAll('label').forEach(el => el.style.color = '');

    let hasError = false;

    function showError(inputId, errorId, message) {
        const label = document.querySelector(`label[for="${inputId}"]`);
        const errorText = document.getElementById(`erro-${inputId === 'usuario' ? 'user' : inputId === 'confirm-senha' ? 'repeat' : inputId}`);

        if (label) {
            label.style.color = "red";
        }
        
        if (errorText) {
            errorText.style.display = 'block';
            errorText.textContent = message;
        }

        hasError = true;
    }

    if (usuario.length < 8) {
        showError('usuario', 'error-name', 'O usuário deve conter no mínimo 8 caracteres');
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        showError('email', 'error-email', 'Formato de email inválido!');
    }
    
    if (senha.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        showError('senha', 'error-password', 'Formato de senha inválido!');
    }
    
    if (senha !== confirmSenha || confirmSenha == '') {
        showError('confirm-senha', 'error-confirm-pass', 'As senhas não coincidem!');
    }

    if (hasError) return;


   
    fetch('/store-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'Application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ usuario, email, senha })
    })
    .then(response => response.json())  
    .then(data => {
        if (data.success) {
            document.getElementById('form-create-user').reset();
            window.location.href = '/';
        } else {
            const erroCreate = document.getElementById('erro-create-user');
            let labelEmail = document.getElementById('label-email');
            labelEmail.style.color="red";
            let inputEmail = document.getElementById('email');
            inputEmail.style.border="1px solid red";
            erroCreate.style.display = "block"
            erroCreate.textContent = data.message;
        }
    })
    .catch(error => console.error('Erro na requisição:', error));
});
