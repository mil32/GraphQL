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
  GraphQLSchema,
  buildSchema
} = require("graphql");
const db = require('./db/dbHelper');
const app = express();
const port = process.env.PORT || 5000;

const {pizzaSchema} = require('./db/models/pizza');


////// DB STUFF ///
db.connect();

//
const Pizza = mongoose.model('Pizza', pizzaSchema);
const PizzaModel = mongoose.model("pizzaSchema", {
  "id": Number,
  "name": String,
  "ingredients": [{ ingredient: String }],
  "description": String,
  "price": Number
});



app.use("/graphql", ExpressGraphQL({
  schema: buildSchema(`
  type Pizza {
    _id: ID!
    name: String
    ingredients: [String!]
    description: String!
    price: Float!
  }
  input PizzaInput {
    name: String
    ingredients: [String!]
    description: String!
    price: Float!
  }
  type PizzaQuery {
    events: [Pizza!]!
  }

  type PizzaMutation {
    createEvent(pizzaInput: PizzaInput): Pizza
  }

    schema {
      query: PizzaQuery
      mutation: PizzaMutation
    }
  `),
  rootValue: {
    events: () => {
      return Pizza.find()
        .then(pizzas => {
          return pizzas.map(pizza => {
            console.log(pizza);
            return  {...pizza._doc} ;
          });
        }).catch(err => {
          console.log(err);
          throw err;
        });
    },
    createEvent: (args) => {
      const pizza = new PizzaModel({
        title: args.pizzaInput.name,
        ingredients: args.pizzaInput.ingredients,
        description: args.pizzaInput.description,
        price: args.pizzaInput.price
      });
      return pizza
        .save().then(result => {
          console.log(result);
          return { ...result._doc };
        }).catch(err => {
          console.log(err);
          throw err;
        });

    }
  },
  graphiql: true
}));

///////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, () => console.log(`Listening on port ${port}`));

//Unhandled Catching
process.on('unhandledRejection', err => {
  console.error(err);
});