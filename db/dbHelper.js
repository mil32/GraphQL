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

exports.addPizza = async (req,res)=> {
    let {name, ingredients, description, price} = req.body;
    let pizza= new Pizza({
        name, ingredients, description, price
    })
    let savedPizza = await pizza.save();
    res.status(200).json(savedPizza);
}

exports.getPizzas = async (req,res) => {
    let pizzas = await Pizza.find();
    res.json(pizzas);
}

//TODO
exports.deletePizza = async (id) => {
    //  Pizza.deleteOne(id);
    // Pizza.findByIdAndDelete({_id: id},)
}