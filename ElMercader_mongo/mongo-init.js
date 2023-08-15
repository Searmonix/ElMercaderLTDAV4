db.createUser({
    user: 'root',
    pwd: 'root',
    roles: [
        {
            role:'dbOwner',
            db: 'ElMercaderLTDA',
        },
    ],
});

db.createCollection('usuarios');
db.createCollection('orders');
db.createCollection('gadgets');

db.usuarios.insertOne({
    _id: 1,
    identification: '1000',
    name: 'First Admin',
    address: 'Crr 127 Cll 0 #0-1',
    cellPhone: '',
    email: 'usaeste@correo.com',
    password: '1234',
    zone: 'Zona 1',
    type: 'ADM',
    _class: 'com.example.ElMercaderLTDA.Model.User'
});