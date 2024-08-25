const connection = require('../config/db');

const createUser = (username, password, roleId, callback) => {
    connection.query('INSERT INTO Users (username,password,role_id) VALUES (?,?,?)',
        [username, password, roleId],
        callback
    );
};

const findUserByUsername = (username, callback) => {
    connection.query('SELECT * FROM Users WHERE username = ?', [username], callback);
};

module.exports = {createUser,findUserByUsername};