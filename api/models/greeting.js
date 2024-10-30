const mongoose = require('mongoose');

const greetingSchema = new mongoose.Schema({
  uniqueId: { 
    type: String,
    required: true 
  }, 
  imageUrl: { 
    type: String, 
    required: true 
  }, 
  message: {
    type: String,
    required: false
  }, 
  name: { 
    type: String, 
    required: false
  }, 
})

const Greeting = mongoose.model('Greeting', greetingSchema);

module.exports = Greeting;