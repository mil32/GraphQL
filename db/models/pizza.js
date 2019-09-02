const mongoose = require('mongoose');

exports.pizzaSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    description: String,
    price: Number
  });
  
// exports.pizzaSchema = pizzaSchema;
