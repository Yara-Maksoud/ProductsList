import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Products() {

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then(result => setProductList(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.get("https://fakestoreapi.com/products/destroy", id)
            .then(() => {
                setProductList(productList.filter(product => product.id !== id))
            })
            .catch(err => console.log("Error deleting product", err))
    }

    return (
        <div className='products'>
            <h1>Products</h1>
            <Link className='link' to="/products/new">Add Product</Link>

            <table className='productTable'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>

                    </tr>
                </thead>

                <tbody>
                    {productList && productList.map(product => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <div className='actions'>
                                    <Link className='link' to={`/products/show/${product.id}`}>Show</Link>
                                    <Link className='link' to={`/products/edit/${product.id}`}>Edit</Link>
                                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                                </div>

                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}
