import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, wishlist, setWishlist})=> {
  return (
    <div>
      <h2>Products</h2>
      <Link to='/NewProduct'>Add a Product</Link>
      <ul id="products">
        {
          products.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            const favorite = wishlist.find(wishItem => wishItem.product_id === product.id);
            return (
              <li key={ product.id }>
                <Link to={`/products/${product.id}`}><br/>
                  { product.name }<br/>
                  {/* we can totally undo the breaks, just thought it was better readability */}
                  Price: ${(product.price/100).toFixed(2)}
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
                {
                  favorite ? 
                  <img onClick={()=> api.removeFromWishlist({userId: auth.id, wishItem: favorite, setWishlist, wishlist})} className="icon" key="wishItem.id" src="../assets/img/favorite.svg"/>
                  : <img onClick={()=> api.addToWishList({userId: auth.id, wishItem: product, setWishlist, wishlist})} className="icon" key="wishItem.id" src="../assets/img/notFavorite.svg"/>
                }
                
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
