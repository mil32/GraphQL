const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ExpressGraphQL = require("express-graphql");
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");
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

//
const PizzaModel = mongoose.model("pizza", {
  "id": Number,
  "name": String,
  "ingredients": [{ingredient: String}],
  "description": String,
  "price": Number
});

const PizzaType = new GraphQLObjectType({
  name: "Pizza",
  fields: {
      id: { type: GraphQLID },
      ingredients: {type: GraphQLString},
      description: {type: GraphQLString},
      price: {type: GraphQLInt}
  }
});
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
      name: "Query",
      fields: {
          pizzas: {
              type: GraphQLList(PizzaType),
              resolve: (root, args, context, info) => {
                  return PizzaModel.find().exec();
              }
          },
          pizza: {
              type: PizzaType,
              args: {
                  id: { type: GraphQLNonNull(GraphQLID) }
              },
              resolve: (root, args, context, info) => {
                  return PizzaModel.findById(args.id).exec();
              }
          }
      }
  })
});

app.use("/graphql", ExpressGraphQL({
  schema: schema,
  graphiql: true
}));

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