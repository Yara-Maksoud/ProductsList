import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({
    title : '',
    price : '',
    description : ''
  });

  useEffect(() => {
    if(params.id){
      axios.get(`https://fakestoreapi.com/products/${params.id}`)
      .then(result => {
        setProduct({
          title : result.data.title,
          price : result.data.price,
          description : result.data.description
        })
      })
      .catch(err => console.log(err))
    }},[])

  const handleSubmit = e => {
    e.preventDefault();
    params.id ? 
      axios.put(`https://fakestoreapi.com/products/${params.id}`, product)
      .then(result => navigate('/products'))
      .catch(err => console.log("Error editing the product",err))
      // fetch(`https://fakestoreapi.com/products/${params.id}`, {
        //   method:"PUT",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(product),
        // }).then((res) => console.log(res)
        // );
       
      : 
        axios.post('https://fakestoreapi.com/products', product)
        .then((result) => navigate('/products'))
        .catch(err => console.log("Error creating the product",err))
    }

  const handleChange = e =>{
    setProduct({
      ...product,
      [e.target.name] : e.target.value
    });    
  }

  return (
    <div className='productForm'>
      {params.id ? <h2>Edit { product.title }</h2> : <h2>New Product</h2>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Name:</label>
        <input type='text' name='title' id='title' value={product.title} placeholder="Write the product name here" onChange={handleChange} required/>
        <label htmlFor="price" >Price:</label>
        <input type='text' name='price' id='price' value={product.price} placeholder="Write the product price here" onChange={handleChange} />
        <label htmlFor="description">Description:</label>
        <textarea name="description" id='description' value={product.description} placeholder="Write the description here" rows="10" cols="40" onChange={handleChange} required></textarea>
        {
        params.id ? 
          <div className='submit'>
            <button type='submit'>Update</button>
            <div className='links'>
              <Link className='link' to={`/products/show/${params.id}`}>Show</Link>
              <Link className='link' to="/products">Home</Link>
            </div>         
          </div>      
        : 
          <div className='submit'>
            <button type='submit'>Create</button>
            <Link className='link' to="/products">Go back</Link>
          </div>
      }
      
      </form>

      
    </div>
  )
}
