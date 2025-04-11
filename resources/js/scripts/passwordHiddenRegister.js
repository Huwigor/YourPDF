document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.box-icons').forEach(box => {
        box.addEventListener('click', function() {
            const input = this.previousElementSibling; // O input associado
            const openEye = this.querySelector('.open-eye1, .open-eye2');
            const closeEye = this.querySelector('.close-eye1, .close-eye2');

            if (input.type === "password") {
                input.type = "text";
                openEye.classList.add('hidden-eye');
                closeEye.classList.remove('hidden-eye');
            } else {
                input.type = "password";
                openEye.classList.remove('hidden-eye');
                closeEye.classList.add('hidden-eye');
            }
        });
    });
});