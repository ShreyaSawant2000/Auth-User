const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('./routes/fileRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors')
const app = express();

// Use body-parser for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
// Apply file upload routes (without body-parser interference)
app.use('/api/files', fileUpload);

// Apply authentication routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(5000, () => console.log('Server started on port 5000'));
