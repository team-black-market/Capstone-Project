import React from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const WishList = ({products, auth, wishlist, setWishlist})=> {
    return (
    <div className='wishList'>
        {
          wishlist.length !== 0 ?
            <div>
              <h1>{`${auth.username}'s Wishlist`}</h1>
              <table>
              <tr>
                <th>Product</th>
                <th>Date added</th>
              </tr>
              {
                wishlist.map( wishItem => {
                  const product = products.find(product => product.id === wishItem.product_id) || {};
                  return (
                      <tr key={ wishItem.id }>
                          <td id='productInfo'>
                            <button onClick={ ()=> api.removeFromWishlist({userId: auth.id, wishItem, setWishlist, wishlist})}> Remove </button>
                            &nbsp;
                            <Link to={`/products/${product.id}`}>{ product.name }</Link>
                          </td>
                          <td>{ wishItem.created_at.slice(0, 10) }</td>
                      </tr>
                      );
                  })
              }
              </table>

            </div>
            : 
            <div className='noListDiv'>
              <h2>Uh oh! Looks like there's nothing here!</h2>
              <Link style={{fontSize: '2.5em', marginBottom: '1em'}} to='/products'>Click here to get started!</Link>
              <img src='../assets/img/writingIcon.svg'/>
            </div>
        }
    </div>
    );
};

export default WishList;