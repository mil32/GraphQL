import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import style from './css/app.module.scss';

import Header from './components/header/';
//import Home from './pages/home';
import Pizza from './pages/pizzas'
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient();



export default class App extends Component {
  state = {
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Header />
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/" component={Pizza} />
        </Router>
      </ApolloProvider>
    );
  }
}