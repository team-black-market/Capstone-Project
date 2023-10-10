import React from "react";
import { Link } from "react-router-dom";
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';

const AuthHome = ({products, orders, cartCount, auth, logout, cartItems, createLineItem, updateLineItem, cart, lineItems, updateOrder, removeFromCart})=> {
    return (
        <>
            <nav>
              <Link to='/products'>Products ({ products.length })</Link>
              <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link>
              <Link to='/wishlist'>Wishlist</Link>
              <span>
                Welcome { auth.username }!
                <button onClick={ logout }>Logout</button>
              </span>
            </nav>
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
              />
              <Orders
                orders = { orders }
                products = { products }
                lineItems = { lineItems }
              />
            </main>
        </>
    )
}

export default AuthHome