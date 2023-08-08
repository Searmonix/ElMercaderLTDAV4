let sessionName = sessionStorage.getItem('userName');

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

let form = document.getElementById("EditGadgetForm");

const previousData = JSON.parse(sessionStorage.getItem("gadgetDataToEdit"));

if (previousData == null || previousData === '' || previousData === 'null') {
    document.getElementById("content").innerHTML="<h2> Error al obtener usuario, regresa a inicio de sesión </h2><hr>" +
    "<button class='btn btn-outline-secondary justify-content-center d-inline-flex' onclick='location.href=\'../index.html\''>"
}

document.getElementById("ProdEditId").value = previousData.id;
document.getElementById("ProdEditBrand").value = previousData.brand;
document.getElementById("ProdEditCategory").value = previousData.category;
document.getElementById("ProdEditName").value = previousData.name;
document.getElementById("ProdEditDescription").value = previousData.description;
document.getElementById("ProdEditPrice").value = previousData.price;
document.getElementById("ProdEditQuantity").value = previousData.quantity;
document.getElementById("ProdEditPhoto").value = previousData.photography;


form.addEventListener("input", function(event) {

    const data = new FormData(form);
    const gadBrand = data.get("gadgetBrand");
    const gadCategory = data.get("gadgetCategory");
    const gadName = data.get("gadgetName");
    const gadDescription = data.get("gadgetDescription");
    const gadPrice = data.get("gadgetPrice");
    const gadQuantity = data.get("gadgetQuantity");
    const gadPhoto = data.get("gadgetPhoto");

    validBrand = brandFormat.test(gadBrand);
    validCategory = gadCategory.length > 1;
    validName = nameFormat.test(gadName);
    validDescription = gadDescription.length > 1;
    validPrice = gadPrice.length > 1;
    validQuantity = gadQuantity.length > 0;
    validPhotography = gadPhoto.length > 1;

    if (validBrand) {
        document.getElementById("ProdEditBrand").classList.remove("is-invalid");
        document.getElementById("ProdEditBrand").classList.add("is-valid");
    } else {
        document.getElementById("ProdEditBrand").classList.add("is-invalid");
        document.getElementById("ProdEditBrand").classList.remove("is-valid");
        document.getElementById("ErrorBrand").innerText = "Ingresa una marca válida";
    }

    if (validCategory) {
        document.getElementById("ProdEditCategory").classList.remove("is-invalid");
        document.getElementById("ProdEditCategory").classList.add("is-valid");
    } else {
        document.getElementById("ProdEditCategory").classList.add("is-invalid");
        document.getElementById("ProdEditCategory").classList.remove("is-valid");
        document.getElementById("ErrorCategory").innerText = "Ingresa una categoría válida";
    }

    if (validName) {
        document.getElementById("ProdEditName").classList.remove("is-invalid");
        document.getElementById("ProdEditName").classList.add("is-valid");
    } else {
        document.getElementById("ProdEditName").classList.add("is-invalid");
        document.getElementById("ProdEditName").classList.remove("is-valid");
        document.getElementById("ErrorName").innerText = "Ingresa un nombre válido";
    }

    if (validDescription) {
        document.getElementById("ProdEditDescription").classList.remove("is-invalid");
        document.getElementById("ProdEditDescription").classList.add("is-valid");
    } else {
        document.getElementById("ProdEditDescription").classList.add("is-invalid");
        document.getElementById("ProdEditDescription").classList.remove("is-valid");
        document.getElementById("ErrorDescription").innerText = "Ingresa una descripción válida";
    }

    if (validPrice) {
        document.getElementById("ProdEditPrice").classList.remove("is-invalid");
        document.getElementById("ProdEditPrice").classList.add("is-valid");
    } else {
        document.getElementById("ProdEditPrice").classList.add("is-invalid");
        document.getElementById("ProdEditPrice").classList.remove("is-valid");
        document.getElementById("ErrorPrice").innerText = "Ingresa un número válido";
    }

    if (validQuantity) {
        document.getElementById("ProdEditQuantity").classList.remove("is-invalid");
        document.getElementById("ProdEditQuantity").classList.add("is-valid");
    } else {
        document.getElementById("ProdEditQuantity").classList.add("is-invalid");
        document.getElementById("ProdEditQuantity").classList.remove("is-valid");
        document.getElementById("ErrorQuantity").innerText = "Ingresa un cantidad válida";
    }

    if (validPhotography) {
        document.getElementById("ProdEditPhoto").classList.remove("is-invalid");
        document.getElementById("ProdEditPhoto").classList.add("is-valid");
    } else {
        document.getElementById("ProdEditPhoto").classList.add("is-invalid");
        document.getElementById("ProdEditPhoto").classList.remove("is-valid");
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
        'id' : document.getElementById("ProdEditId").value,
        'brand' : document.getElementById("ProdEditBrand").value,
        'category': document.getElementById("ProdEditCategory").value,
        'name' : document.getElementById("ProdEditName").value,
        'description' : document.getElementById("ProdEditDescription").value,
        'price': document.getElementById("ProdEditPrice").value,
        'quantity' : document.getElementById("ProdEditQuantity").value,
        'photography' : document.getElementById("ProdEditPhoto").value,
        'availability': true
    }

    console.log(dataObject);

    $.ajax({    
        url: 'http://140.238.190.51:8080/api/gadget/update',
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify(dataObject),
        success: function(response) {
            sessionStorage.setItem('userName', response.name);
            
            Swal.fire(
                'Genial',
                'EL producto se ha actualizado',
                'success'
                )
        },
        error: function() {
            console.log("Error al actualizar usuario");
        }
    })

});

