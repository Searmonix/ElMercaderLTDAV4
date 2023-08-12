const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

if (loggedUser.name === null) {
    document.getElementById("asesorRegistered").innerText = "";
    document.getElementById("content").innerHTML = "<h2> Error al obtener usuario, regresa a inicio de sesión </h2><hr>" +
    "<button class='btn btn-outline-secondary justify-content-center d-inline-flex' onclick='location.href=\'../index.html\''>";
} else if (loggedUser.name === 'null') {
    document.getElementById("asesorRegistered").innerText = "No existe un usuario con esas credenciales";
    document.getElementById("content").innerHTML = "";
} else if (loggedUser.name != null) {
    document.getElementById("asesorRegistered").innerText = "Bienvenido Asesor Comercial " + loggedUser.name;

    let assignedCoordinator = false;

    $.ajax({
        url: 'http://140.238.190.51:8080/api/user/coord/' + loggedUser.zone,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(response) {
            assignedCoordinator = response.name != null;
            if (assignedCoordinator) {
                document.getElementById("coordInCharge").innerText = "El coordinador de la zona " + loggedUser.zone + " es " + response.name;
            } else {
                document.getElementById("coordInCharge").innerText = "No hay un coordinador asignado para la " + loggedUser.zone;
            }
        },
        error: function() {
            console.log("No se pudo encontrar coordinador en la zona " + loggedUser.zone);
        }
    });

    if (assignedCoordinator) {
        $.ajax({
            url: 'http://140.238.190.51:8080/api/gadget/all',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                let appendProductHead = '<thead><tr><th>ID</th><th>BRAND</th><th>CATEGORY</th><th>NAME</th><th>DESCRIPTION</th><th>PRICE</th><th>AVAILABILITY</th><th>QUANTITY</th><th>PHOTOGRAPHY</th><th>DESIRED AMOUNT</th></tr></thead><tbody>';
                document.getElementById('nOrdersTable').innerHTML = appendProductHead;
                showData(response);
            },
            error: function() {
                console.log("Error al encontrar productos");
            }
        });
    }
}

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
        let productOrderToAdd = JSON.stringify(data);
        appendGadgetTable += '<td> <img src="'+data.photography+'" alt="Imágen del producto" class="img-thumbnail"> </td>';
        appendGadgetTable += "<td> <button class='btn btn-outline-success' onclick='addProductToOrder("+productOrderToAdd+")'>Agregar Producto</button></td>";
        appendGadgetTable += '</tr>';
    });

    document.getElementById('rProductsTable').innerHTML = appendGadgetTable;
}

function addProductToOrder(data) {
    let appendGadgetTable = '';

    appendGadgetTable += '<tr id="addedProduct'+ data.id +'">';

    Object.values(data).slice(0, -1).forEach((userAttributes) => {
        if (userAttributes === true || userAttributes === false) {
            appendGadgetTable += userAttributes ? '<td>Sí</td>' : '<td>No</td>';
        } else {
            appendGadgetTable += '<td>' + userAttributes + '</td>';
        }
    });
    appendGadgetTable += '<td><img src="'+data.photography+'" alt="Imágen del producto" class="img-thumbnail"></td>';
    appendGadgetTable += '<td><input value="1", min="1" type="number" id="quantityOrdered'+data.id+'"></td>';
    appendGadgetTable += '<td><button class="btn btn-outline-danger" onclick="$(\'#addedProduct'+data.id+'\').remove()">Quitar Producto</button></td>';
    appendGadgetTable += '</tr>';


    $("#nOrdersTable").append(appendGadgetTable);
}

function newOrdersToSend() {

    let collectionOfProducts = $("#nOrdersTable");
    let productAttributes = ['id', 'brand', 'category', 'name', 'description', 'price', 'availability', 'quantity', 'photography'];
    let productEntities = [];
    let startingQuantities = 0;
    let productQuantities = [];

    // Encontrar únicamente las entidades de la tabla
    collectionOfProducts.find('tbody tr').each(function () {
        let prodEntity = {};

        $(this).find('td').each(function (index) {
            // Para asegurarnos que solo estemos tomando los atributos para conseguir los valores de cada entidad correspondiente
            if (index > productAttributes.length) {
                return;
            }

            // Que el producto esté disponible
            if (index === productAttributes.length-3) {
                prodEntity[productAttributes[index]] = $(this).html() === "Sí";
                return;
            }  
            
            // Que tenga una imagen, encontrar el tag img y retornar las variables del src de la imagen
            if (index === productAttributes.length-1) {
                prodEntity[productAttributes[index]] = $(this).find('img').attr('src');
                return;
            }

            // Cantidad que fue solicitada
            if (index === productAttributes.length) {
                startingQuantities = $(this).find('input').val();
                return;
            }

            let attKey = productAttributes[index];
            let entValue = $(this).html();

            prodEntity[attKey] = entValue;
        });
        productEntities.push(prodEntity);
        productQuantities.push(startingQuantities);  
    });
    // Así lo pide la plataforma
    return [productEntities, productQuantities];
}

function sendNewOrder() {
    let [productsToSend, quantitiesToSend] = newOrdersToSend();

    if (productsToSend.length > 0 && quantitiesToSend.length > 0) {
        // "products":{"1":{"id":1,"brand":"GENIUS" .......
        // Así es la respuesta esperada, agregar el + 1 le indica que 
        // debe empezar en "products":{"1" y no en "0"
        let dataProduct = {};
        let quantityProduct = {};

        productsToSend.forEach(function (product, index) {
            dataProduct[index + 1] = product;
            quantityProduct[index + 1] = quantitiesToSend[index];
        });

        let dataObject = {
            'id' : Math.floor(Math.random() * 100),
            'registerDate' : new Date().toISOString(),
            'status' : "Pendiente",
            'salesMan' : loggedUser,
            'products' : dataProduct,
            'quantities' : quantityProduct
        };


        $.ajax({
            url: 'http://140.238.190.51:8080/api/order/new',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            asyn: false,
            data: JSON.stringify(dataObject),
            success: function(response) {
                Swal.fire(
                    "Genial",
                    "Una nueva orden ha sido agregada.\n"
                    + "Número de orden: " +response.id+ ".",
                    'success'
                    )
                setTimeout(() => location.reload(), 2000);
            }
        });

    } else {
        alert("Agrega un producto válido");
    }

}