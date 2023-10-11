import React from "react";
import { Link } from "react-router-dom";
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';


const AuthHome = ({products, orders, cartCount, auth, logout, cartItems, createLineItem, updateLineItem, cart, lineItems, updateOrder, removeFromCart, wishlist, setWishlist, minusLineItem})=> {

    return (
        <>
            <main>
              <Products
                auth = { auth }
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }

              />
              <Cart
                cart = { cart }
                lineItems = { lineItems }
                products = { products }
                updateOrder = { updateOrder }
                removeFromCart = { removeFromCart }
                updateLineItem = { updateLineItem }
                minusLineItem = { minusLineItem }
              />
              <Orders
                orders = { orders }
                products = { products }
                lineItems = { lineItems }
                wishlist={ wishlist }
                setWishlist={ setWishlist }

              />
            </main>
        </>
    )
}

export default AuthHome