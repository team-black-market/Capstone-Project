import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route } from 'react-router-dom';
import Products from './Products';
import Orders from './Orders';
import Cart from './Cart';
import Login from './Login';
import api from './api';
import WishList from ('./WishList');

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [wishList, setWishList] = useState([]);

  const attemptLoginWithToken = async()=> {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(()=> {
    attemptLoginWithToken();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchWishList(setWishList);
      };
      fetchData();
    }
  }, [auth]);


  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async(order)=> {
    await api.updateOrder({ order, setOrders });
  };

  const removeFromCart = async(lineItem)=> {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const createWishItem = async(product)=> {
    await api.createWishItem({ product, wishList, setWishList});
  };

  const updateWishItem = async(wishItem)=> {
    await api.updateWishItem({ wishItem, wishList, setWishList });
  };

  const updateWishList = async(product)=> {
    await api.updateWishList({ product, wishList, setWishList });
  };

  const removeFromWishList = async(wishItem)=> {
    await api.deleteWishItem({ wishItem, wishList, setWishList });
  };

  //const wish = products.find(product => product.is_wish) || {};

  //const wishItems = products.filter(wishItem => wishItem.id === product.id);
  
  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const logout = ()=> {
    api.logout(setAuth);
  }

  return (
    <div>
      {
        auth.id ? (
          <>
            <nav>
              <Link to='/products'>Products ({ products.length })</Link>
              <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link>
              <Link to='/wishList'>Wish List ({ wish.quantity })</Link>
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
              <WishList
                createWishItem = { createWishItem }
                updateWishItem = { updateWishItem }
                updateWishList = { updateWishList }
                removeFromWishList = { removeFromWishList }
              />
              <Orders
                orders = { orders }
                products = { products }
                lineItems = { lineItems }
              />
            </main>
            </>
        ):(
          <div>
            <header>
              <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </nav>
              <Routes>
                <Route path="/login" element={<Login login={ login }/>}/>
                <Route path="/register" element={<h1>Register page here</h1>}/>
              </Routes>
            </header>
            <div id="logoDiv">
                <img id="logo" src="/assets/noPlaceLikeHome.svg"/>
            </div> 
          </div>
        )
      }
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
