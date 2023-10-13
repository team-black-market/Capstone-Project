import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, wishlist, setWishlist})=> {
  return (
    <div>
      <ul id="products">
        {
          products.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            const favorite = wishlist.find(wishItem => wishItem.product_id === product.id);
            return (
              <div className='productContainer' key={ product.id }>
                <div id='productHeader'>
                  <div>
                    <p>${(product.price).toFixed(2)}</p>
                    <p>Qty: {product.quantity}</p>
                  </div>
                  {
                    favorite ? 
                    <img onClick={()=> api.removeFromWishlist({userId: auth.id, wishItem: favorite, setWishlist, wishlist})} key="wishItem.id" src="../assets/img/favorite.svg"/>
                    : <img onClick={()=> api.addToWishList({userId: auth.id, wishItem: product, setWishlist, wishlist})} key="wishItem.id" src="../assets/img/notFavorite.svg"/>
                  }
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
                      cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
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
