import React from 'react';

const WishList = ({ updateWishList, removeFromWishList, wishItems, products })=> {
  return (
    <div>
      <h2>Wish List</h2>
      <ul>
        {
          wishItems.map( wishItem => {
            const product = products.find(product => product.id === wishItem.product_id) || {};
            return (
              <li key={ wishItem.id }>
                { product.name }
      
                <button onClick={ ()=> removeFromWishList(wishItem)}>Remove From Wish List</button>
              </li>
            );
          })
        }
      </ul>
      {
        <button onClick={()=> updateWishList(wishItem)}>Add To Wish List</button>}
    </div>
  );
};

export default WishList;