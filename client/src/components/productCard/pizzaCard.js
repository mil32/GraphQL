import React from 'react';
import Button from '../button/button';

import style from './card.module.scss';

function pizzaCard(props)  {

        const {name, ingredients, description, price} = props.data; 
        return ( 
            <div className={style.card}>
                <div className={style.image}></div>
                <div className={style.data}>
                    <h2>{name? name : "No Name"}</h2>
                    <p>{ingredients.map( (item, index) => (index ? ', ' : '') + item ) } </p>
                    <p>{description}</p>
                    <div className={style.price}>{`$ ${price}`}</div>
                    <Button /* onClick="" */ type="primary" color="success"> Pedir </Button>
                    <Button /* onClick="" */ type="secondary" color="alert"> Pedir </Button>
                    <Button /* onClick="" */ type="tertiary" > Ayuda </Button> 

                </div>
            </div>
         );
    
}
 
export default pizzaCard;