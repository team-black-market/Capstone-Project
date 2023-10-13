import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './Unauthorized/Login';
import api from './api';


 import Searchbar from './Searchbar';

import Home from './Unauthorized/Home';
import Register from './Unauthorized/Register';
import Product from './Authorized/Product'
import NewProduct from './Authorized/NewProduct';
import AuthHome from './Authorized/AuthHome';
import WishList from './Authorized/WishList';
import Products from './Authorized/Products'
import Orders from './Authorized/Orders';
import Cart from './Authorized/Cart';
import Reviews from './Authorized/Reviews';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate()

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
        await api.fetchWishlist({userId: auth.id, setWishlist: setWishlist});
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchReviews(setReviews);
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

  const minusLineItem = async(lineItem)=> {
    await api.minusLineItem({lineItem, cart, lineItems, setLineItems})
  }
  
  const removeFromCart = async(lineItem)=> {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const newestProduct = async(items)=> {
    await api.newestProduct(items);
  };

  const newReview = async(items) => {
    await api.newReview(items);
  };

  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
    navigate('/home')
  }

  // Register function(Back end not built)
  const registerUser = async(newUserInfo)=> {
    await api.registerUser(newUserInfo)
  }

  const logout = ()=> {
    api.logout(setAuth);
    navigate('/')
  }

  return (
    <>
      {
        auth.id ? (
        <>
          <nav className='navBar'>
            <Link to='/home'><img className='icon' src='../assets/img/homeIcon.svg'/> Home</Link>
            <Link to='/products'><img className='icon' src='../assets/img/productIcon.svg'/> Products</Link>
            <Link to='/NewProduct'><img className='icon' src='../assets/img/postIcon.svg'/> Post</Link>
            <Link to='/wishlist'><img className='icon' src='../assets/img/favoriteNav.svg'/> Wishlist</Link>
            <Link to='/orders'><img className='icon' src='../assets/img/orderIcon.svg'/> Orders</Link>
            <Link to='/cart'><img className='icon' src='../assets/img/cartIcon.svg'/> Cart ({ cartCount })</Link>
            <div className='dropDown'>
              <Link className='dropbtn'> {auth.username} <img style={{width: '0.5em', height: '0.5em'}} src='../assets/img/dropDownIcon.svg'/></Link>
              <div className='dropDownContent'>
                <Link to='/profile:id'><img className='icon' src='../assets/img/profileIcon.svg'/> Profile</Link>
                <Link to='/settings'><img className='icon' src='../assets/img/settingsIcon.svg'/> Settings</Link>
                <Link to='/' onClick={ logout }><img className='icon' src='../assets/img/logoutIcon.svg'/> Logout</Link>
              </div>
            </div>

            
          </nav>
          <Routes>
            <Route path='/home' element={<Home auth={auth}/>}/>
            <Route path='/products/:id' element={<Product products={ products } newReview={ newReview } reviews={reviews} setReviews={setReviews}/>}/>
            {/* check route & id here ^^^^ */}
            <Route path='/newProduct' element={<NewProduct newestProduct={ newestProduct }  products={ products } setProducts={ setProducts }/>}/>
            <Route path='/products' element={<Products auth = { auth } products={ products } cartItems = { cartItems } createLineItem = { createLineItem } updateLineItem = { updateLineItem } wishlist={ wishlist } setWishlist={ setWishlist }/>}/>
            <Route path='/products/search/:term' element={<Products auth = { auth } products={ products } cartItems = { cartItems } createLineItem = { createLineItem } updateLineItem = { updateLineItem } wishlist={ wishlist } setWishlist={ setWishlist }/>}/>
            <Route path='/orders' element={<Orders orders = { orders } products = { products } lineItems = { lineItems }/>}/>
            <Route path='/cart' element={<Cart cart = { cart } lineItems = { lineItems } products = { products } updateOrder = { updateOrder } removeFromCart = { removeFromCart } minusLineItem = { minusLineItem } setLineItems= { setLineItems }/>}/>
            <Route path='/wishlist' element={<WishList products={ products } auth={ auth } wishlist={ wishlist } setWishlist={ setWishlist }/>}/>
            <Route path='*' element={<></>}/>
          </Routes>
        </>
        ):(
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login/*' element={<Login login={ login }/>}/>
            <Route path='/register' element={<Register registerUser={ registerUser }/>}/>
            <Route path='*' element={<></>}/>
          </Routes>
        )
      }
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);