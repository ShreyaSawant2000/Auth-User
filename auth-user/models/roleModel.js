const connection = require('../config/db');

const roles = ['Super Admin','Admin','Support Admin','User','Customer'];

roles.forEach(role => {
    connection.query('INSERT INTO Roles (role_name) VALUES (?)',[role],(err,results) => {
        if (err) console.error('Error inserting roles',err);
    })
})