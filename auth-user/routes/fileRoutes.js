const express = require('express');
const multer = require('multer');
const { authenticateToken, checkRole, generateToken } = require('../middleware/authMiddleware');
const { uploadFile } = require('../models/fileModel');
const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Upload a new file
router.post('/upload', authenticateToken, checkRole([1,2,3]),upload.single('file'), (req, res) => {
    const { file } = req;
    const uploadedBy = req.user.id;

    uploadFile(file.originalname, file.path, uploadedBy, (err, results) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).send('Error uploading file');
        }
        res.status(201).send('File uploaded successfully');
    });
});

// Retrieve all uploaded files
router.get('/me', authenticateToken, (req, res) => {
    const user = req.user;
    res.status(200).json({
        id:user.id,
        username: user.username,
        roleId: user.roleId
    });
});

module.exports = router;
