import React from 'react';
import PizzaCard from './productCard/pizzaCard';
import layout from '../css/layout.module.scss';
import style from './productFilter.module.scss';

// returns array of objects ingredient and quantity
function mapIngredients(products){ 
    let ingMap = new Map([]);
    products.forEach(pr => (
        pr.ingredients.forEach( ing => {
            if(ingMap.has(ing)) {
                ingMap.set(ing , ingMap.get(ing) + 1 );
            } else {
                ingMap.set(ing , 1)
            }
        })
    ))
    return Array.from(ingMap.entries())
}


function FilterElement(props){
    let { value, cant, toggle, filters } = props;
    let classes= [ style.element];
    if(filters.includes(value)){
        classes.push(style.active)
    }
    
    return (<span className={classes.join(' ')} onClick={() => { toggle(value)}}> 
           <span className={style.name}> { value } </span>
           <span className={style.cant}>({ cant }) </span>
        </span>)  
}

function filterProducts(products, filters){
    return products.filter( (prod) => {
        return filters.every((fl) => {
            return prod.ingredients.includes(fl);
        })
    }) 
}



export default function pizzaGrid (props) {
        const {products, toggleFilters, filters} = props;
        const filteredProducts = filterProducts(products,filters);
        const ingredients = mapIngredients(filteredProducts);
        return ( 
                <div>
                    <div className="">
                        {
                            ingredients.length > 0 ?
                            ingredients.map((obj, i) =>  (<FilterElement value={obj[0]} cant={obj[1]} key={i} toggle={toggleFilters} filters={filters}/> ) )
                            : ""
                        }
                    </div>
                    <div className={layout.productGrid}>
                        {
                            filteredProducts.length >0 ?
                            filteredProducts.map((prod,i) => ( <PizzaCard data={prod} key={i} />))
                            : ""
                        }
                    </div>
                </div>
             );
    }
