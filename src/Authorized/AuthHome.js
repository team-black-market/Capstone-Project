import React from "react";
import { Link } from "react-router-dom";
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';

const AuthHome = ({products, orders, cartCount, auth, logout, cartItems, createLineItem, updateLineItem, cart, lineItems, updateOrder, removeFromCart, wishlist, setWishlist})=> {
    return (
        <>
            <main>
              <Products
                auth = { auth }
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }
                wishlist={ wishlist }
                setWishlist={ setWishlist }
              />
            </main>
        </>
    )
}

export default AuthHome