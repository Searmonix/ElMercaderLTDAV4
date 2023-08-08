const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

let validEmail = false;

let validPassword = false;

let form = document.getElementById("LoginForm");


form.addEventListener("input", function(event) {

    const data = new FormData(form);
    const email = data.get("e-mail");
    const password = data.get("password");

    validEmail = emailFormat.test(email);
    validPassword = password.length >= 6 && password.length !== 0;

    if (validEmail) {
        document.getElementById("LogEmail").classList.remove("is-invalid");
        document.getElementById("LogEmail").classList.add("is-valid");
    } else {
        document.getElementById("LogEmail").classList.add("is-invalid");
        document.getElementById("LogEmail").classList.remove("is-valid");
        document.getElementById("ErrLogEmail").innerText = "Ingresa un e-mail válido";
    }

    if (validPassword) {
        document.getElementById("LogPassword").classList.remove("is-invalid");
        document.getElementById("LogPassword").classList.add("is-valid");
    } else {
        document.getElementById("LogPassword").classList.add("is-invalid");
        document.getElementById("LogPassword").classList.remove("is-valid");
        document.getElementById("ErrLogPassword").innerText = "Contaseña incorrecta";
    }

});


form.addEventListener("submit", function(event) {

    let email = document.getElementById("LogEmail").value;

    if (!form.checkValidity() || !validEmail || !validPassword) {

        console.log("Valida los campos");
        event.stopImmediatePropagation();
        event.preventDefault();

    } else {

        const userEmail = document.getElementById("LogEmail").value;
        const userPassword = document.getElementById("LogPassword").value;

        console.log("Funciona esta parte");

        $.ajax({
            url: 'http://140.238.190.51:8080/api/user/' + userEmail + '/' + userPassword,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(response) {
                sessionStorage.setItem('loggedUser', JSON.stringify(response));
            },

            // Destructuración, jqXHR es un objeto, al que le podemos sacar llaves y valores
            // jqXHR podemos obtener una llave responseJSON, quien contiene la respuesta de error
            // "timestamp", etc. También estaba "message" una llave que contiene un mensaje de error
            // hecho en el directorio ErrorHandler en Java
            error: function({ responseJSON :  { message } }) {
                console.log(message);
                alert(message);
                setTimeout(() => location.href("."), 2000);
            }
        });

    }
});
