const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

if (loggedUser.name === null) {
    document.getElementById("coordRegistered").innerText = "";
    document.getElementById("content").innerHTML = "<h2> Error al obtener usuario, regresa a inicio de sesión </h2><hr>" +
    "<button class='btn btn-outline-secondary justify-content-center d-inline-flex' onclick='location.href=\'../index.html\''>";
} else if (loggedUser.name === 'null') {
    document.getElementById("coordRegistered").innerText = "No existe un usuario con esas credenciales";
    document.getElementById("content").innerHTML = "";
} else if (loggedUser.name != null) {
    document.getElementById("coordRegistered").innerText = "Bienvenido Coordinador " + loggedUser.name;
    document.getElementById("coordZone").innerText = "Tu zona asignada es " +loggedUser.zone;

    let assignedSalesMan = false;

    $.ajax({
        url: 'http://140.238.190.51:8080/api/user/salesman/' + loggedUser.zone,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(response) {
            console.log(response);
            assignedSalesMan = Boolean(response);
        },
        error: function() {
            console.log("No se pudo encontrar asesores en la zona " + loggedUser.zone);
        }
    });

    if (assignedSalesMan) {
        $.ajax({
            url: 'http://140.238.190.51:8080/api/order/all',
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(response) {
                showData(response);
            },
            error: function() {
                console.log("Error al encontrar productos");
            }
        });

    } else {
        document.getElementById("content").innerHTML = "<h2> Error al obtener usuario, regresa a inicio de sesión </h2><hr>" +
        "<button class='btn btn-outline-secondary justify-content-center d-inline-flex' onclick='location.href=\'../index.html\''>";
    }

}

function showData(data) {
    console.log(data);
    let appendOrdersDoneTable = '';

    appendOrdersDoneTable += '<thead><tr><th>ID</th><th>REGISTER DATE</th><th>PRODUCTS</th><th>STOCK</th><th>IN-CART</th><th>ADVISOR</th><th>STATUS</th></tr></thead><tbody>';

    data.forEach(({ products, quantities, salesMan, status, id : orderId, registerDate }) => {

        let { name : salesName, id } = salesMan;

        Object.keys(products).forEach((k) => {

            let { brand, category, name, quantity } = products[k];
            let desiredQuantity = quantities[k];

            appendOrdersDoneTable += `<tr>`
            appendOrdersDoneTable += `
                <td> ${orderId} </td>
                <td> ${new Date(registerDate).toISOString()} </td>
                <td> ${brand} ${category, name} </td>
                <td> ${quantity} </td>
                <td> ${desiredQuantity} </td>
                <td> ${id} --> ${salesName} </td>
                <td> ${status} </td>
            `;
            appendOrdersDoneTable += `<td> <button class="btn btn-outline-success" onclick="actualizarDatos(${orderId}, 'Approved')"> Aprobar </button></td>`;
            appendOrdersDoneTable += `<td> <button class="btn btn-outline-danger" onclick="actualizarDatos(${orderId}, 'Rejected')"> Rechazar </button></td>`;

            appendOrdersDoneTable += `</tr>`;
        });

        
    });

    document.getElementById("ordersToBeConfirmed").innerHTML = appendOrdersDoneTable;

}

function actualizarDatos(id, status) {
    let dataToUpdate = {
        'id': id,
        'status': status
    };

    $.ajax({
        url: 'http://140.238.190.51:8080/api/order/update',
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(dataToUpdate),
        async: false,
        success: function(response) {
            location.reload();
        },
        error: function() {
            console.log("Error al actualizar producto");
        }
    });
}