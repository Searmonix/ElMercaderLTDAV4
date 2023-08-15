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