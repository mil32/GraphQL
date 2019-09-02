import React, { Component } from 'react';
import axios from 'axios';

import Alert from '../alert';
import Input from './elements/input/'

class createForm extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, modal: false,
            product:{}}
    }

    handleChange = event => {
        this.setState({ 
            ...this.state,
            product: {
                ...this.state.product,
                [event.target.name] : event.target.value
            } 
        });
    }
    
    toggleModal = () => {
        this.setState(prevState => ({
            ...this.state,
            modal: !prevState.modal
          }));
        }
    

    clearProduct = () => {
        this.setState({ loading: false, 
            modal: true,
            product:{
            name: "",
            ingredients:"",
            description:"",
            price:"",
        }});
    }
    

    handleSubmit = event => {
        event.preventDefault();
        
        const { product } = this.state;
        // transforma string en array
        product.ingredients = product.ingredients.split(',').map(st => st.trim()).filter(st => st!=="");

        axios.post(`/api/pizza`,  product )
          .then(res => {
            console.log(res.data);
            this.clearProduct();
            this.props.refresh();
          })
    }


    render() { 
        const {product} = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input label="Product Name" name="name" value={product.name} onChange={this.handleChange} required="required"/>
                    <Input label="Ingredients" name="ingredients" value={product.ingredients} onChange={this.handleChange} required="required"/>
                    <Input label="Description" name="description" value={product.description} onChange={this.handleChange} required="required"/>
                    <Input label="Price" name="price" value={product.price} onChange={this.handleChange} required="required"/>
                    <button type="submit" >ENVIAR</button>
                </form>
                { this.state.modal && <Alert hide={this.toggleModal}/> }
               
            </div>
          );
    }
}
 
export default createForm;