import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const WishList = ({products, auth, wishlist, setWishlist})=> {
    return (
    <div>
        <h2>{`${auth.username}'s Wishlist`}</h2>
        <ul>
        {
            wishlist.map( wishItem => {
            const product = products.find(product => product.id === wishItem.product_id) || {};
            return (
                <div key={ wishItem.id }>
                  <p>
                    {<b>{ product.name }</b>}
                    &nbsp; Added on: &nbsp;
                    { wishItem.created_at }
                    &nbsp;
                    {<button onClick={ ()=> api.removeFromWishlist({userId: auth.id, wishItem, setWishlist, wishlist})}> (remove) </button>}
                  </p>
                  <button>Add to cart</button>
                </div>
                );
            })
        }
        </ul>
    </div>
    );
};

export default WishList;