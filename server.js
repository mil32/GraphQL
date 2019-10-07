const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = require('./db/dbHelper');
const app = express();
const PORT = process.env.PORT || 5000;


const typeDefs = gql`
  type Pizza {
    name: String,
    ingredients: [String],
    description: String,
    price: Int
  }
  type Query {
    pizzas: [ Pizza ]
  }
  type Mutation {
    pizza(name: String!, ingredients: [String], description: String, price: Int! ) : Pizza
  }
`;

const resolvers = {
  Query: {
    pizzas: db.getPizzas    
  },
  Mutation: {
    pizza: (root, args, context, info) => { return db.addPizza(args) }
  }
};

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

// app.post('/api/pizza', db.addPizza);
//app.get('/api/pizzas', db.getPizzas);


// app.delete('/api/pizza', async (req,res) =>{
//   let erased = await db.deletePizza(req.body);
//   res.status(200);
//   // let res = await db.deletePizza()
// });

const server = new ApolloServer({ typeDefs, resolvers});
server.applyMiddleware({ app });


app.listen({port: PORT}, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`));
