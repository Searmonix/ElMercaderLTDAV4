const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

console.log(loggedUser);

if (loggedUser.type === "ASE") {
    location.href="../html/asesorHome.html";
} else if (loggedUser.type === "COORD") {
    location.href="../html/coordHome.html";
}

const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const nameFormat = /^\w[A-Za-z]*$/;

let validEmail = false;

let validPassword = false;

let matchingPassword = false;

let validName = false;

let validIdentification = false;

let addressFormat = /([A-Z]|[0-9 ^\#\-])\w+/;

let validAddress = false;

let validCellPhone = false;

let validZone = false;

let validType = false;

let form = document.getElementById("AccCreationForm");

console.log(form);

function checkForEmail(email) {
    let emailFound = false;
    $.ajax({
        url: 'http://140.238.190.51:8080/api/user/emailexist/' + email,
        type: 'GET',
        dataType: 'json',
        // El proceso de búsqueda tendrá que esperar hasta que sea iniciada esta función
        async: false,
        success: function(response) {
            emailFound = Boolean(response)
        },

        error: function() {
            console.log("No se puede validar el e-mail");
        }
    });

    return emailFound;
}

form.addEventListener("input", function(event) {

    const data = new FormData(form);
    const uId = data.get("userId");
    const uIdentification = data.get("userIdentification");
    const name = data.get("uname");
    const address = data.get("userAddress");
    const cellPhone = data.get("unumber");
    const email = data.get("e-mail");
    const password = data.get("password");
    const passwordConfirmation = data.get("cPassword");
    const zone = data.get("uZone");
    const type = data.get("uType");

    validId = uId > 0;
    validIdentification = uIdentification.length > 6;
    validName = nameFormat.test(name);
    validAddress = addressFormat.test(address) && address.length > 5;
    validCellPhone = cellPhone.length === 10; 
    validEmail = emailFormat.test(email);
    validPassword = password.length >= 6 && password.length !== 0;
    matchingPassword = password === passwordConfirmation && password !== "";
    validZone = zone.length > 1;
    validType = type === "COORD" || type === "ASE";

    if (validId) {
        document.getElementById("AccId").classList.remove("is-invalid");
        document.getElementById("AccId").classList.add("is-valid");
    } else {
        document.getElementById("AccId").classList.add("is-invalid");
        document.getElementById("AccId").classList.remove("is-valid");
        document.getElementById("ErrorId").innerText = "Ingresa un id válido";
    }

    if (validIdentification) {
        document.getElementById("AccIdentification").classList.remove("is-invalid");
        document.getElementById("AccIdentification").classList.add("is-valid");
    } else {
        document.getElementById("AccIdentification").classList.add("is-invalid");
        document.getElementById("AccIdentification").classList.remove("is-valid");
        document.getElementById("ErrorIdentification").innerText = "Ingresa un número de identificación válido";
    }

    if (validName) {
        document.getElementById("AccName").classList.remove("is-invalid");
        document.getElementById("AccName").classList.add("is-valid");
    } else {
        document.getElementById("AccName").classList.add("is-invalid");
        document.getElementById("AccName").classList.remove("is-valid");
        document.getElementById("ErrorNombre").innerText = "Ingresa un nombre válido";
    }

    if (validAddress) {
        document.getElementById("AccAddress").classList.remove("is-invalid");
        document.getElementById("AccAddress").classList.add("is-valid");
    } else {
        document.getElementById("AccAddress").classList.add("is-invalid");
        document.getElementById("AccAddress").classList.remove("is-valid");
        document.getElementById("ErrorAddress").innerText = "Ingresa una dirección válida";
    }

    if (validCellPhone) {
        document.getElementById("AccNumber").classList.remove("is-invalid");
        document.getElementById("AccNumber").classList.add("is-valid");
    } else {
        document.getElementById("AccNumber").classList.add("is-invalid");
        document.getElementById("AccNumber").classList.remove("is-valid");
        document.getElementById("ErrorNumber").innerText = "Ingresa un número válido";
    }

    if (validEmail) {
        document.getElementById("AccEmail").classList.remove("is-invalid");
        document.getElementById("AccEmail").classList.add("is-valid");
    } else {
        document.getElementById("AccEmail").classList.add("is-invalid");
        document.getElementById("AccEmail").classList.remove("is-valid");
        document.getElementById("ErrorEmail").innerText = "Ingresa un e-mail válido";
    }

    if (validPassword) {
        document.getElementById("AccPassword").classList.remove("is-invalid");
        document.getElementById("AccPassword").classList.add("is-valid");
    } else {
        document.getElementById("AccPassword").classList.add("is-invalid");
        document.getElementById("AccPassword").classList.remove("is-valid");
        document.getElementById("ErrorPassword").innerText = "Tu constraseña es muy corta";
    }

    if (matchingPassword) {
        document.getElementById("AccPasswordConfirmation").classList.remove("is-invalid");
        document.getElementById("AccPasswordConfirmation").classList.add("is-valid");
    } else {
        document.getElementById("AccPasswordConfirmation").classList.add("is-invalid");
        document.getElementById("AccPasswordConfirmation").classList.remove("is-valid");
        document.getElementById("ErrorConfPassword").innerText = "Las contraseñas no coinciden";   
    }

    if (validZone) {
        document.getElementById("AccZone").classList.remove("is-invalid");
        document.getElementById("AccZone").classList.add("is-valid");
    } else {
        document.getElementById("AccZone").classList.add("is-invalid");
        document.getElementById("AccZone").classList.remove("is-valid");
        document.getElementById("ErrorZone").innerText = "Ingresa una zona válida";
    }
    
    if (validType) {
        document.getElementById("AccType").classList.remove("is-invalid");
        document.getElementById("AccType").classList.add("is-valid");
    } else {
        document.getElementById("AccType").classList.add("is-invalid");
        document.getElementById("AccType").classList.remove("is-valid");
        document.getElementById("ErrorType").innerText = "Ingresa un tipo válido";
    }
});

form.addEventListener("submit", function(event) {
   
    event.preventDefault();

    event.stopImmediatePropagation();   

    let dataObject = {
    'id' : document.getElementById("AccId").value,
    'identification' : document.getElementById("AccIdentification").value,
    'name': document.getElementById("AccName").value,
    'address' : document.getElementById("AccAddress").value,
    'cellPhone' : document.getElementById("AccNumber").value,
    'email': document.getElementById("AccEmail").value,
    'password': document.getElementById("AccPassword").value,
    'zone' : document.getElementById("AccZone").value,
    'type' : document.getElementById("AccType").value
    }

    $.ajax({    
        url: 'http://140.238.190.51:8080/api/user/new',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify(dataObject),
        success: function(response) {            
            Swal.fire(
                'Genial',
                'Tu cuenta ha sido creada',
                'success'
                )
        },
        error: function({responseJSON : {message} }) {
            // Únicamente puede evitar fallas de e-mail 
            alert(message)
            document.getElementById("AccEmail").classList.add("is-invalid");
            document.getElementById("AccEmail").classList.add("is-valid");
            document.getElementById("ErrorEmail").innerText = "Este e-mail ya está registrado";
        }
    });

});


$(document).ready(function() {

    if (loggedUser.name === null) {
        document.getElementById("userRegistered").innerText = "";
        document.getElementById("content").innerHTML = "<h2> Error al obtener usuario, regresa a inicio de sesión </h2><hr>" +
        "<button class='btn btn-outline-secondary justify-content-center d-inline-flex' onclick='location.href=\'../index.html\''>";
    } else if (loggedUser.name === "null"){
        document.getElementById("userRegistered").innerText = "No existe un usuario con esas credenciales";
        document.getElementById("content").innerHTML = "";
    } else if (loggedUser.name != null) {
        document.getElementById("userRegistered").innerText = "Bienvenido " + loggedUser.name;
    
        $.ajax({
            url: 'http://140.238.190.51:8080/api/user/all',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                showData(response);
            },
            error: function() {
                console.log("Error al encontrar usuarios");
            }
        });
    }
});

function showData(data) {

    console.log(data);

    let appendUserTable = '';

    appendUserTable += '<thead><tr><th>ID</th><th>IDENTIFICATION</th><th>NAME</th><th>ADRESS</th><th>PHONE NUMBER</th><th>E-MAIL</th><th>PASSWORD</th><th>ZONE</th><th>TYPE</th></tr></thead><tbody>';

    data.forEach((data) => {
        appendUserTable += '<tr>';
        Object.values(data).forEach((userAttributes) => {
            appendUserTable += '<td>' + userAttributes + '</td>';
        });
        let dataAttributes = JSON.stringify(data);
        appendUserTable += "<td> <button class='btn btn-outline-warning' onclick='actualizarDatos("+ dataAttributes +");'>Editar</button></td>";
        appendUserTable += '<td> <button class="btn btn-outline-danger" onclick="eliminarDatos('+ data.id +')">Eliminar</button>';
        appendUserTable += '</tr>';
    });

    document.getElementById('userTable').innerHTML = appendUserTable;
}

function actualizarDatos(dataToEdit) {
    sessionStorage.setItem('userDataToEdit', JSON.stringify(dataToEdit));
    location.href ="../html/editarUsuario.html";
}

function eliminarDatos(id) {
    $.ajax({
        url: 'http://140.238.190.51:8080/api/user/' + id,
        type: 'DELETE',
        dataType: 'json',
        success: function(response) {
            location.reload();
        },
        error: function() {
            console.log("Error al eliminar usuarios");
        }
    });
}