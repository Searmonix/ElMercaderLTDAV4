const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

const nameFormat = /^\w[A-Za-z \s]+$/;

const brandFormat = /^\w[A-Za-z]+$/;

let validId = false;

let validBrand = false;

let validCategory = false;

let validName = false;

let validDescription = false;

let validPrice = false;

let validQuantity = false;

let validPhotography = false;

let form = document.getElementById("NewGadgetForm");

form.addEventListener("input", function(event) {

    const data = new FormData(form);
    const gadId = data.get("gadgetId");
    const gadBrand = data.get("gadgetBrand");
    const gadCategory = data.get("gadgetCategory");
    const gadName = data.get("gadgetName");
    const gadDescription = data.get("gadgetDescription");
    const gadPrice = data.get("gadgetPrice");
    const gadQuantity = data.get("gadgetQuantity");
    const gadPhoto = data.get("gadgetPhoto");

    validId = gadId.length > 0;
    validBrand = brandFormat.test(gadBrand);
    validCategory = gadCategory.length > 1;
    validName = nameFormat.test(gadName);
    validDescription = gadDescription.length > 1;
    validPrice = gadPrice.length > 1;
    validQuantity = gadQuantity.length > 0;
    validPhotography = gadPhoto.length > 1;

    if (validId) {
        document.getElementById("ProductId").classList.remove("is-invalid");
        document.getElementById("ProductId").classList.add("is-valid");
    } else {
        document.getElementById("ProductId").classList.add("is-invalid");
        document.getElementById("ProductId").classList.remove("is-valid");
        document.getElementById("ErrorId").innerText = "Ingresa un Id válido";
    }

    if (validBrand) {
        document.getElementById("ProductBrand").classList.remove("is-invalid");
        document.getElementById("ProductBrand").classList.add("is-valid");
    } else {
        document.getElementById("ProductBrand").classList.add("is-invalid");
        document.getElementById("ProductBrand").classList.remove("is-valid");
        document.getElementById("ErrorBrand").innerText = "Ingresa una marca válida";
    }

    if (validCategory) {
        document.getElementById("ProductCategory").classList.remove("is-invalid");
        document.getElementById("ProductCategory").classList.add("is-valid");
    } else {
        document.getElementById("ProductCategory").classList.add("is-invalid");
        document.getElementById("ProductCategory").classList.remove("is-valid");
        document.getElementById("ErrorCategory").innerText = "Ingresa una categoría válida";
    }

    if (validName) {
        document.getElementById("ProductName").classList.remove("is-invalid");
        document.getElementById("ProductName").classList.add("is-valid");
    } else {
        document.getElementById("ProductName").classList.add("is-invalid");
        document.getElementById("ProductName").classList.remove("is-valid");
        document.getElementById("ErrorName").innerText = "Ingresa un nombre válido";
    }

    if (validDescription) {
        document.getElementById("ProductDescription").classList.remove("is-invalid");
        document.getElementById("ProductDescription").classList.add("is-valid");
    } else {
        document.getElementById("ProductDescription").classList.add("is-invalid");
        document.getElementById("ProductDescription").classList.remove("is-valid");
        document.getElementById("ErrorDescription").innerText = "Ingresa una descripción válida";
    }

    if (validPrice) {
        document.getElementById("ProductPrice").classList.remove("is-invalid");
        document.getElementById("ProductPrice").classList.add("is-valid");
    } else {
        document.getElementById("ProductPrice").classList.add("is-invalid");
        document.getElementById("ProductPrice").classList.remove("is-valid");
        document.getElementById("ErrorPrice").innerText = "Ingresa un número válido";
    }

    if (validQuantity) {
        document.getElementById("ProductQuantity").classList.remove("is-invalid");
        document.getElementById("ProductQuantity").classList.add("is-valid");
    } else {
        document.getElementById("ProductQuantity").classList.add("is-invalid");
        document.getElementById("ProductQuantity").classList.remove("is-valid");
        document.getElementById("ErrorQuantity").innerText = "Ingresa un cantidad válida";
    }

    if (validPhotography) {
        document.getElementById("ProductPhoto").classList.remove("is-invalid");
        document.getElementById("ProductPhoto").classList.add("is-valid");
    } else {
        document.getElementById("ProductPhoto").classList.add("is-invalid");
        document.getElementById("ProductPhoto").classList.remove("is-valid");
        document.getElementById("ErrorPhoto").innerText = "No es posible acceder a la foto";
    }
});

form.addEventListener("submit", function(event) {
   
    event.preventDefault();

    event.stopImmediatePropagation();   

    if (!form.checkValidity() || !validId || !validBrand || !validCategory || !validName ||  !validDescription ||  !validPrice ||  !validQuantity || !validPhotography) {
        console.log("Hay uncampo incorrecto")
    }

    let dataObject = {
        'id' : document.getElementById("ProductId").value,
        'brand' : document.getElementById("ProductBrand").value,
        'category': document.getElementById("ProductCategory").value,
        'name' : document.getElementById("ProductName").value,
        'description' : document.getElementById("ProductDescription").value,
        'price': document.getElementById("ProductPrice").value,
        'availability': true,
        'quantity' : document.getElementById("ProductQuantity").value,
        'photography' : document.getElementById("ProductPhoto").value
    }

    console.log(dataObject);

    $.ajax({    
        url: 'http://140.238.190.51:8080/api/gadget/new',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify(dataObject),
        success: function(response) { 
            Swal.fire(
                'Genial',
                'Un nuevo producto ha sido agregado',
                'success'
                )
        },
        error: function() {
            console.log("Error al actualizar usuario");
        }
    })

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
            url: 'http://140.238.190.51:8080/api/gadget/all',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                showData(response);
            },
            error: function() {
                console.log("Error al encontrar productos");
            }
        });
    }
});

function showData(data) {

    let appendGadgetTable = '';

    appendGadgetTable += '<thead><tr><th>ID</th><th>BRAND</th><th>CATEGORY</th><th>NAME</th><th>DESCRIPTION</th><th>PRICE</th><th>AVAILABILITY</th><th>QUANTITY</th><th>PHOTOGRAPHY</th></tr></thead><tbody>';

    data.forEach((data) => {
        appendGadgetTable += '<tr>';
        Object.values(data).slice(0, -1).forEach((userAttributes) => {
            if (userAttributes === true || userAttributes === false) {
            appendGadgetTable += userAttributes ? '<td>Sí</td>' : '<td>No</td>';
            } else {
            appendGadgetTable += '<td>' + userAttributes + '</td>';
            }
        });
        let dataAttributes = JSON.stringify(data);
        appendGadgetTable += '<td> <img src="'+data.photography+'" alt="Imágen del producto" class="img-thumbnail"> </td>';
        appendGadgetTable += "<td> <button class='btn btn-outline-warning' onclick='actualizarDatos("+ dataAttributes +");'>Editar</button></td>";
        appendGadgetTable += '<td> <button class="btn btn-outline-danger" onclick="eliminarDatos('+ data.id +')">Eliminar</button> </td>';
        appendGadgetTable += '</tr>';
    });

    document.getElementById('gadgetTable').innerHTML = appendGadgetTable;
}


function actualizarDatos(dataToEdit) {
    sessionStorage.setItem('gadgetDataToEdit', JSON.stringify(dataToEdit));
    location.href ="../html/editarGadget.html";
}

function eliminarDatos(id) {
    $.ajax({
        url: 'http://140.238.190.51:8080/api/gadget/' + id,
        type: 'DELETE',
        dataType: 'json',
        success: function(response) {
            location.reload();
        },
        error: function() {
            console.log("Error al eliminar producto");
        }
    });
}