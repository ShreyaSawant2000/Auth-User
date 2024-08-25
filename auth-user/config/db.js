const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'shreya1234',
    database:'authrole'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MYSQL:',err);
        return;
    }
    console.log('Connected to MYSQL');
});
module.exports = connection;