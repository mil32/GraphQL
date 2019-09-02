const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = require('./db/dbHelper');
const app = express();
const port = process.env.PORT || 5000;



////// DB STUFF ///
db.connect();

let fakeBody = {
  "name": "Calabresa",
  "ingredients": ['Tomate', 'Muzarella', 'Cantimpalo'],
  "description": "El Sabor italiano y americano del cantimpalo",
  "price": "290"
}

///////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/pizza', db.addPizza);
app.get('/api/pizzas', db.getPizzas);


app.delete('/api/pizza', async (req,res) =>{
  let erased = await db.deletePizza(req.body);
  res.status(200);
  // let res = await db.deletePizza()
});


app.listen(port, () => console.log(`Listening on port ${port}`));

//Unhandled Catching
process.on('unhandledRejection', err => {
  console.error(err);
});