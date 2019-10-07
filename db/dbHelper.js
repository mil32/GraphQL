const mongoose = require('mongoose');
const {pizzaSchema} = require('./models/pizza');

const Pizza = mongoose.model('Pizza', pizzaSchema);

exports.connect = ()=> {

    mongoose.connect('mongodb://localhost/dtb0', {useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
        console.log("DB CONECTED!");
    });
    
}

exports.addPizza = async (args)=> {
    let {name, ingredients, description, price} = args;
    let pizza= new Pizza({
        name, ingredients, description, price
    })
    let savedPizza = await pizza.save();
    return savedPizza;
}

exports.getPizzas = async () => {
    let pizzas = await Pizza.find();
    return pizzas;
}

//TODO
exports.deletePizza = async (id) => {
    //  Pizza.deleteOne(id);
    // Pizza.findByIdAndDelete({_id: id},)
}