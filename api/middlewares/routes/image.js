const express = require('express');
const router = express.Router();
const {handleImageUpload, handleGetImageURL} = require('../controllers/image');
const upload = require('../multer')

// Define the route for creating greetings
router.post('/save', upload.single('image'),handleImageUpload);
router.get('/geturl/:id', handleGetImageURL)

module.exports = router;
