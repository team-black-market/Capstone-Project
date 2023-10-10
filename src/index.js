import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './Unauthorized/Login';
import api from './api';
<<<<<<< HEAD
import Home from './Home';
import Register from './Register';
import Searchbar from './Searchbar';
=======
import Home from './Unauthorized/Home';
import Register from './Unauthorized/Register';
import Product from './Authorized/Product'
import NewProduct from './Authorized/NewProduct';
import AuthHome from './Authorized/AuthHome';
>>>>>>> c97c58a026ac7852f1d23908bcbeff77b1f4ead6

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});

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

  const createProduct = async(newProduct)=> {
    await api.createProduct({newProduct});
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
<<<<<<< HEAD
          <>
            <nav className='navBar'>
              <Link to='/products'>Products ({ products.length })</Link>
              <Link to='/orders'>Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link>
              <span>
                Welcome { auth.username }!
                <button onClick={ logout }>Logout</button>
              </span>
            </nav>
            
              <Searchbar products={products} />
     
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
=======
          <Routes>
            <Route path='/home' element={<AuthHome logout={ logout } cartCount={ cartCount } auth={ auth } createLineItem={ createLineItem } updateLineItem={ updateLineItem } cart={ cart } updateOrder={ updateOrder } removeFromCart={ removeFromCart } orders={ orders } products={ products } lineItems={ lineItems } cartItems={cartItems}/>}/>
            <Route path='/products/:id' element={<Product products={ products }/>}/>
            <Route path='/newProduct' element={<NewProduct createProduct={ createProduct }/>}/>
            <Route path='*' element={<></>}/>
          </Routes>
>>>>>>> c97c58a026ac7852f1d23908bcbeff77b1f4ead6
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
