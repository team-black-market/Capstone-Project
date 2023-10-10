import React, { useState, useEffect } from 'react';
import api from '../api';

const WishList = ({products, auth})=> {
  const [wishlist, setWishlist] = useState([])

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchWishlist({userId: auth.id, setWishlist: setWishlist});
    };
    fetchData();
  }, []);

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
                </div>
                );
            })
        }
        </ul>
    </div>
    );
};

export default WishList;