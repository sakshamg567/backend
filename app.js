const express = require('express');
const connectToMongoDB = require('./connection');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const router = require('./api/middlewares/routes/image');

app.use('/api', router);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.get('/', (req, res) => {
  res.render('home')
})

connectToMongoDB(process.env.MONGODB_URI, () => {
 console.log('Connected to MongoDB')
}).then(console.log('Connected to MongoDB'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is running on port : ',port);
})