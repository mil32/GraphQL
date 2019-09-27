import React, { Component } from 'react';
import { container } from '../css/layout.module.scss';
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import PizzaGrid from '../components/pizzaGrid';
import CreateForm from '../components/forms/createForm';

export default class pizza extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, products: [], filters: [] }
    }

    componentDidMount() {
        this.setProducts();
    }

    toggleFilters = (filter) => {
        let { filters } = this.state;
        let index = filters.indexOf(filter);
        if (index > -1) {
            filters.splice(index, 1);
        } else {
            filters.push(filter);
        }
        this.setState({
            ...this.state,
            filters
        })
    }

    setProducts = async () => {
        try {
            const client = new ApolloClient();

            const data = await client
                .query({
                    query: gql`
                query {
                    events{
                        _id
                        name
                        ingredients
                        price
                    }
                }
                `
                })
                .then(result => { return result; });

            this.setState({
                loading: false,
                products: data.data.events
            })
        } catch (error) {
            console.log("ERROR CACHETADO");
            this.setState({
                loading: false,
                error: "can't get products"
            })
        }
    }

    render() {
        return (
            <div className={container}>
                <h1>Our Juici Pizzas...</h1>
                {this.state.error ? (
                    <h1>No Pizzas Today...</h1>
                ) : (
                        <PizzaGrid toggleFilters={this.toggleFilters} filters={this.state.filters} products={this.state.products} loading={this.state.loading} />
                    )}

                <h2>Create your own Pizza!</h2>
                <CreateForm refresh={this.setProducts} />
            </div>
        );
    }
}
