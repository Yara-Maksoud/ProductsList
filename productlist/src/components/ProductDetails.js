import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
    const[product, setProduct] = useState();
    const params = useParams();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${params.id}`)
        .then(result => {setProduct(result.data); 
        })
        .catch(err => console.log(err))
    },[])
  return (
    <div>
        {
            product ?
                <div  className='productDetails'>
                    <h2>{product.title}</h2>
                    <div className='details'>
                        <h4>Name:</h4>
                        <p>{product.title}</p>
                    </div>
                    <div className='details'>
                        <h4>Price:</h4>
                        <p>{product.price}</p>
                    </div>
                    <div className='details'>
                        <h4>Description:</h4>
                        <p>{product.description}</p>

                    </div>                   
                    
                    <div className='links'>
                        <Link className='link' to="/products">Back</Link>
                        <Link className='link' to={`/products/edit/${product.id}`}>Edit</Link>
                    </div>
                    
                </div>
                 
            : null   
            
            
        }
       

    </div>
  )
}
