import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api';


const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, wishlist, setWishlist, minusLineItem, removeFromCart, deleteProduct})=> {
  const [deletePrompt, setDeletePrompt] = useState(false)
  const [deleteItem, setDeleteItem] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate();
  const { term } = useParams();

  const setDeleteStates = (product)=> {
    setDeletePrompt(true)
    setDeleteItem(product)
  }

  const searchFunction = ()=> {
    if(searchTerm !== ''){
      navigate(`/products/search/${searchTerm}`)
    } else {
      navigate(`/products`)
    }
  }

  return (
    <div>
      {
        deletePrompt ?
        <div className='deletePrompt'>
          <div>
            <h1>Are you sure you want to delete this product?</h1>
            <div>
              <button className='deletePromptButton' id='deleteButton' onClick={()=> {deleteProduct(deleteItem); setDeletePrompt(false)}}>Delete</button>
              <button className='deletePromptButton' onClick={()=> {setDeletePrompt(false)}}>Cancel</button>
            </div>
          </div>
        </div>
        : null
      }
      <div id='searchBarContainer'>
        <form onSubmit={searchFunction}>
          <input placeholder='Search' value={ searchTerm || '' } onChange={ev => {setSearchTerm(ev.target.value)}}/>
          <button>Search</button>
        </form>
      </div>
        <ul id="products">
        { 
          auth.is_vip ? 
            products.filter(product => !term || product.name.toLowerCase().includes(term.toLowerCase())).map( product => {
              const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
              const favorite = wishlist.find(wishItem => wishItem.product_id === product.id);
              return (
              <div className='productContainer' key={ product.id }>
                  <div id='productHeader'>
                    <div>
                      <p>${(product.price).toFixed(2)}</p>
                      <p>Qty: {product.quantity}</p>
                    </div>
                    <div>
                      {
                        product.for_vip ? <img className='icon' src='../assets/img/vipIcon.svg'/> : null
                      }
                      &nbsp;&nbsp;
                      {
                        favorite ? 
                        <img style={{cursor: 'pointer'}} onClick={()=> api.removeFromWishlist({userId: auth.id, wishItem: favorite, setWishlist, wishlist})} key="wishItem.id" src="../assets/img/favorite.svg"/>
                        : <img style={{cursor: 'pointer'}} onClick={()=> api.addToWishList({userId: auth.id, wishItem: product, setWishlist, wishlist})} key="wishItem.id" src="../assets/img/notFavorite.svg"/>
                      }
                      &nbsp;&nbsp;
                      {
                        auth.is_admin ? (
                          <>
                            <Link to={`/products/${product.id}/edit`}><img className='icon' src='../assets/img/editIcon.svg'/></Link>
                            &nbsp;&nbsp;
                            <img 
                            style={{cursor: 'pointer'}} 
                            onClick={()=> {setDeleteStates(product)}} 
                            className='icon' 
                            src='../assets/img/deleteIcon.svg'/>
                          </>
                        ): null
                      }
                    </div>
                  </div>
                  <div id='productImage'>
                    <img src={product.image_url}/>
                  </div>
                  <div id='productFooter'>
                    <Link to={`/products/${product.id}`}>
                      { product.name.length <= 15 ? product.name : product.name.slice(0, 15) + '...' }
                    </Link>
                    {
                      auth.id ? (
                        cartItem ?
                        <div>
                          <button onClick={ ()=> updateLineItem(cartItem)} disabled={(cartItem.quantity === product.quantity) ? true : false}>+</button>
                          &nbsp;
                          {
                            cartItem.quantity > 1 ? <button onClick={ ()=> minusLineItem(cartItem)}>-</button> 
                            : <button onClick={ ()=> removeFromCart(cartItem)}>-</button>
                          }
                        </div>
                        : <button onClick={ ()=> createLineItem(product)}>Add to cart</button>
                      ): null 
                    }  
                  </div>
                </div>
              );
            })
          : 
          products.filter(product => (!term || product.name.toLowerCase().includes(term).toLowerCase()) && !product.for_vip).map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            const favorite = wishlist.find(wishItem => wishItem.product_id === product.id);
            return (
            <div className='productContainer' key={ product.id }>
                <div id='productHeader'>
                  <div>
                    <p>${(product.price).toFixed(2)}</p>
                    <p>Qty: {product.quantity}</p>
                  </div>
                  <div>
                    {
                      product.for_vip ? <img className='icon' src='../assets/img/vipIcon.svg'/> : null
                    }
                    &nbsp;&nbsp;
                    {
                      favorite ? 
                      <img onClick={()=> api.removeFromWishlist({userId: auth.id, wishItem: favorite, setWishlist, wishlist})} key="wishItem.id" src="../assets/img/favorite.svg"/>
                      : <img onClick={()=> api.addToWishList({userId: auth.id, wishItem: product, setWishlist, wishlist})} key="wishItem.id" src="../assets/img/notFavorite.svg"/>
                    }
                  </div>
                </div>
                <div id='productImage'>
                  <img src={product.image_url}/>
                </div>
                <div id='productFooter'>
                  <Link to={`/products/${product.id}`}>
                    { product.name }
                  </Link>
                  {
                    auth.id ? (
                      cartItem ? <button className='buttonStyle'onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                    ): null 
                  }
                  {
                    auth.is_admin ? (
                      <Link to={`/products/${product.id}/edit`}>Edit</Link>
                    ): null
                  }  
                </div>
              </div>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;