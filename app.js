const express = require('express');
const connectToMongoDB = require('./connection');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const router = require('./routes/image');

app.use('/api', router);

connectToMongoDB(process.env.MONGODB_URI, () => {
 console.log('Connected to MongoDB')
}).then(console.log('Connected to MongoDB'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is running on port : ',port);
})