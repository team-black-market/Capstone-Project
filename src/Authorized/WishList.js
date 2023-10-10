import React, { useState, useEffect } from 'react';

const WishList = ()=> {
  const [wishlist, setWishlist] = useState([])

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchWishlist(setWishlist);
    };
    fetchData();
  }, []);

    return (
    <div>
        <h2>Wish List</h2>
        <ul>
        {
            wishlist.map( wishItem => {
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
    </div>
    );
};

export default WishList;