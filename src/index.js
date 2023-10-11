import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './Unauthorized/Login';
import api from './api';
// import Searchbar from './Searchbar';
import Home from './Unauthorized/Home';
import Register from './Unauthorized/Register';
import Product from './Authorized/Product'
import NewProduct from './Authorized/NewProduct';
import AuthHome from './Authorized/AuthHome';
import WishList from './Authorized/WishList';
import Products from './Authorized/Products'
import Orders from './Authorized/Orders';
import Cart from './Authorized/Cart';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [wishlist, setWishlist] = useState([])

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

  const newestProduct = async(items)=> {
    await api.newestProduct(items);
  }

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
  const register = async(newUserInfo)=> {
    await api.register({ newUserInfo })
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
            <Link to='/home'>Home</Link>
            <Link to='/products'>Products ({ products.length })</Link>
            <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
            <Link to='/cart'>Cart ({ cartCount })</Link>
            <Link to='/wishlist'>Wishlist ({wishlist.length})</Link>
            <span>
              Welcome { auth.username }!
              <button onClick={ logout }>Logout</button>
            </span>
          </nav>
          <Routes>
            <Route path='/home' element={<Home auth={auth}/>}/>
            <Route path='/products/:id' element={<Product products={ products }/>}/>
            <Route path='/newProduct' element={<NewProduct newestProduct={ newestProduct }  products={ products } setProducts={ setProducts }/>}/>
            <Route path='/products' element={<Products auth = { auth } products={ products } cartItems = { cartItems } createLineItem = { createLineItem } updateLineItem = { updateLineItem } wishlist={ wishlist } setWishlist={ setWishlist }/>}/>
            <Route path='/orders' element={<Orders orders = { orders } products = { products } lineItems = { lineItems }/>}/>
            <Route path='/cart' element={<Cart cart = { cart } lineItems = { lineItems } products = { products } updateOrder = { updateOrder } removeFromCart = { removeFromCart }/>}/>
            <Route path='/wishlist' element={<WishList products={ products } auth={ auth } wishlist={ wishlist } setWishlist={ setWishlist }/>}/>
            <Route path='*' element={<></>}/>
          </Routes>
        </>
        ):(
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login/*' element={<Login login={ login }/>}/>
            <Route path='/register' element={<Register register={ register }/>}/>
            <Route path='*' element={<></>}/>
          </Routes>
        )
      }
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);