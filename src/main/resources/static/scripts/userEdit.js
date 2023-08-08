const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const nameFormat = /^\w[A-Za-z \s]+$/;

let sessionName = sessionStorage.getItem('userName');

let validEmail = false;

let validPassword = false;

let matchingPassword = false;

let validName = false;

let validIdentification = false;

let addressFormat = /([A-Z]|[0-9 ^\#\-])\w+/;

let validCellPhone = false;

let validZone = false;

let validType = false;

let form = document.getElementById("EditUserForm");

const previousData = JSON.parse(sessionStorage.getItem("userDataToEdit"));

if (previousData == null || previousData === '' || previousData === 'null') {
    document.getElementById("content").innerHTML="<h2> Error al obtener usuario, regresa a inicio de sesión </h2><hr>" +
    "<button class='btn btn-outline-secondary justify-content-center d-inline-flex' onclick='location.href=\'../index.html\''>"
}

document.getElementById("EditId").value = previousData.id;
document.getElementById("EditIdentification").value = previousData.identification;
document.getElementById("EditName").value = previousData.name;
document.getElementById("EditAddress").value = previousData.address;
document.getElementById("EditNumber").value = previousData.cellPhone;
document.getElementById("EditEmail").value = previousData.email;
document.getElementById("EditPassword").value = previousData.password;
document.getElementById("EditPasswordConfirmation").value = previousData.password;
document.getElementById("EditZone").value = previousData.zone;
document.getElementById("EditType").value = previousData.type;

function checkForEmail(email) {
    if (previousData.email !== email) {
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
    } else {
        return false;
    }
    
}

form.addEventListener("input", function(event) {

    const data = new FormData(form);
    const uIdentification = data.get("userIdentification");
    const name = data.get("uname");
    const address = data.get("userAddress");
    const cellPhone = data.get("unumber");
    const email = data.get("e-mail");
    const password = data.get("password");
    const passwordConfirmation = data.get("cPassword");
    const zone = data.get("uZone");
    const type = data.get("uType");

    validIdentification = uIdentification.length > 6;
    validName = nameFormat.test(name);
    validAddress = addressFormat.test(address) && address.length > 5;
    validCellPhone = cellPhone.length === 10; 
    validEmail = emailFormat.test(email);
    validPassword = password.length >= 6 && password.length !== 0;
    matchingPassword = password === passwordConfirmation && password !== "";
    validZone = zone.length > 1;
    validType = type === "COORD" || type === "ASE" (type === "ADM" && previousData.type === "ADM");

    if (validIdentification) {
        document.getElementById("EditIdentification").classList.remove("is-invalid");
        document.getElementById("EditIdentification").classList.add("is-valid");
    } else {
        document.getElementById("EditIdentification").classList.add("is-invalid");
        document.getElementById("EditIdentification").classList.remove("is-valid");
        document.getElementById("ErrorIdentification").innerText = "Ingresa un número de identificación válido";
    }

    if (validName) {
        document.getElementById("EditName").classList.remove("is-invalid");
        document.getElementById("EditName").classList.add("is-valid");
    } else {
        document.getElementById("EditName").classList.add("is-invalid");
        document.getElementById("EditName").classList.remove("is-valid");
        document.getElementById("ErrorNombre").innerText = "Ingresa un nombre válido";
    }

    if (validAddress) {
        document.getElementById("EditAddress").classList.remove("is-invalid");
        document.getElementById("EditAddress").classList.add("is-valid");
    } else {
        document.getElementById("EditAddress").classList.add("is-invalid");
        document.getElementById("EditAddress").classList.remove("is-valid");
        document.getElementById("ErrorAddress").innerText = "Ingresa una dirección válida";
    }

    if (validCellPhone) {
        document.getElementById("EditNumber").classList.remove("is-invalid");
        document.getElementById("EditNumber").classList.add("is-valid");
    } else {
        document.getElementById("EditNumber").classList.add("is-invalid");
        document.getElementById("EditNumber").classList.remove("is-valid");
        document.getElementById("ErrorNumber").innerText = "Ingresa un número válido";
    }

    if (validEmail) {
        document.getElementById("EditEmail").classList.remove("is-invalid");
        document.getElementById("EditEmail").classList.add("is-valid");
    } else {
        document.getElementById("EditEmail").classList.add("is-invalid");
        document.getElementById("EditEmail").classList.remove("is-valid");
        document.getElementById("ErrorEmail").innerText = "Ingresa un e-mail válido";
    }

    if (validPassword) {
        document.getElementById("EditPassword").classList.remove("is-invalid");
        document.getElementById("EditPassword").classList.add("is-valid");
    } else {
        document.getElementById("EditPassword").classList.add("is-invalid");
        document.getElementById("EditPassword").classList.remove("is-valid");
        document.getElementById("ErrorPassword").innerText = "Tu constraseña es muy corta";
    }

    if (matchingPassword) {
        document.getElementById("EditPasswordConfirmation").classList.remove("is-invalid");
        document.getElementById("EditPasswordConfirmation").classList.add("is-valid");
    } else {
        document.getElementById("EditPasswordConfirmation").classList.add("is-invalid");
        document.getElementById("EditPasswordConfirmation").classList.remove("is-valid");
        document.getElementById("ErrorConfPassword").innerText = "Las contraseñas no coinciden";   
    }

    if (validZone) {
        document.getElementById("EditZone").classList.remove("is-invalid");
        document.getElementById("EditZone").classList.add("is-valid");
    } else {
        document.getElementById("EditZone").classList.add("is-invalid");
        document.getElementById("EditZone").classList.remove("is-valid");
        document.getElementById("ErrorZone").innerText = "Ingresa una zona válida";
    }
    
    if (validType) {
        document.getElementById("EditType").classList.remove("is-invalid");
        document.getElementById("EditType").classList.add("is-valid");
    } else {
        document.getElementById("EditType").classList.add("is-invalid");
        document.getElementById("EditType").classList.remove("is-valid");
        document.getElementById("ErrorType").innerText = "Ingresa un tipo válido";
    }
});

form.addEventListener("submit", function(event) {
   
    event.preventDefault();

    event.stopImmediatePropagation();   

    let dataObject = {
        'id' : document.getElementById("EditId").value,
        'identification' : document.getElementById("EditIdentification").value,
        'name': document.getElementById("EditName").value,
        'address' : document.getElementById("EditAddress").value,
        'cellPhone' : document.getElementById("EditNumber").value,
        'email': document.getElementById("EditEmail").value,
        'password': document.getElementById("EditPassword").value,
        'zone' : document.getElementById("EditZone").value,
        'type' : document.getElementById("EditType").value
    }

    console.log(dataObject);

    $.ajax({    
        url: 'http://140.238.190.51:8080/api/user/update',
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify(dataObject),
        success: function(response) {
            sessionStorage.setItem('userName', response.name);
            
            Swal.fire(
                'Genial',
                'La cuenta ha sido actualizada',
                'success'
                )
        },
        error: function() {
            console.log("Error al actualizar usuario");
        }
    })

});

