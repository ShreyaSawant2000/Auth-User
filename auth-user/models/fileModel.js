const connection = require('../config/db');

const uploadFile = (fileName, filePath, uploadedBy, callback) => {
  connection.query('INSERT INTO Files (file_name, file_path, uploaded_by) VALUES (?, ?, ?)', 
    [fileName, filePath, uploadedBy], 
    callback
  );
};

const getAllFiles = (callback) => {
  connection.query('SELECT * FROM Files', callback);
};

module.exports = { uploadFile, getAllFiles };
