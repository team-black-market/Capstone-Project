import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './Unauthorized/Login';
import api from './api';
import Home from './Unauthorized/Home';
import Register from './Unauthorized/Register';
import Product from './Authorized/Product'
import NewProduct from './Authorized/NewProduct';
import WishList from './Authorized/WishList';
import Products from './Authorized/Products'
import Orders from './Authorized/Orders';
import Cart from './Authorized/Cart';
import Profile from './Authorized/Profile';
import Reviews from './Authorized/Reviews';
import EditProduct from './Authorized/Edit';
import Settings from './Authorized/Settings';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [productTags, setProductTags] = useState([]);

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

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchProductTags(setProductTags);
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

  const updateProduct = async(items) => {
    await api.updateProduct(items)
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

  const registerUser = async(newUserInfo)=> {
    await api.registerUser(newUserInfo)
  }

  const logout = ()=> {
    api.logout(setAuth);
    navigate('/')
  }

  const deleteProduct = (product)=> {
    api.deleteProduct({product: product, products: products, setProducts: setProducts})
  }

  return (
    <>
      {
        auth.id ? (
        <>
          <nav className='navBar'>
            <Link to='/home'><img className='icon' src='../assets/img/homeIcon.svg'/>&nbsp;Home</Link>
            <Link to='/products'><img className='icon' src='../assets/img/productIcon.svg'/>&nbsp;Products</Link>
            <Link to='/NewProduct'><img className='icon' src='../assets/img/postIcon.svg'/>&nbsp;Post</Link>
            <Link to='/wishlist'><img className='icon' src='../assets/img/favoriteNav.svg'/>&nbsp;Wishlist</Link>
            <Link to='/orders'><img className='icon' src='../assets/img/orderIcon.svg'/>&nbsp;Orders</Link>
            <Link to='/cart'><img className='icon' src='../assets/img/cartIcon.svg'/>&nbsp;Cart ({ cartCount })</Link>
            <div className='dropDown'>
              <Link className='dropbtn'> {auth.is_vip ? <img className='icon' src='../assets/img/vipIcon.svg'/> : null}&nbsp;{auth.username} <img style={{width: '0.5em', height: '0.5em'}} src='../assets/img/dropDownIcon.svg'/></Link>
              <div className='dropDownContent'>
                <Link to='/profile'><img className='icon' src='../assets/img/profileIcon.svg'/>&nbsp;Profile</Link>
                <Link to='/settings'><img className='icon' src='../assets/img/settingsIcon.svg'/>&nbsp;Settings</Link>
                <Link to='/' onClick={ logout }><img className='icon' src='../assets/img/logoutIcon.svg'/>&nbsp;Logout</Link>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path='/home' element={<Home auth={auth}/>}/>
            <Route path='/products/:id' element={<Product products={ products } newReview={ newReview } reviews={reviews} setReviews={setReviews}/>}/>
            <Route path='/products/:id/edit' element={<EditProduct products={ products } updateProduct={ updateProduct } setProducts={ setProducts }/>} />
            <Route path='/newProduct' element={<NewProduct newestProduct={ newestProduct }  products={ products } setProducts={ setProducts }/>}/>
            <Route path='/products' element={<Products auth = { auth } products={ products } cartItems = { cartItems } createLineItem = { createLineItem } updateLineItem = { updateLineItem } wishlist={ wishlist } setWishlist={ setWishlist } minusLineItem={ minusLineItem } removeFromCart={ removeFromCart } deleteProduct={ deleteProduct }/>}/>
            <Route path='/products/search/:term' element={<Products auth = { auth } products={ products } cartItems = { cartItems } createLineItem = { createLineItem } updateLineItem = { updateLineItem } wishlist={ wishlist } setWishlist={ setWishlist }/>}/>
            <Route path='/orders' element={<Orders orders = { orders } products = { products } lineItems = { lineItems }/>}/>
            <Route path='/cart' element={<Cart cart = { cart } lineItems = { lineItems } products = { products } updateOrder = { updateOrder } removeFromCart = { removeFromCart } minusLineItem = { minusLineItem } setLineItems= { setLineItems } updateLineItem={ updateLineItem }/>}/>
            <Route path='/wishlist' element={<WishList products={ products } auth={ auth } wishlist={ wishlist } setWishlist={ setWishlist }/>}/>
            <Route path='/profile' element={<Profile auth={auth}/>}/>
            <Route path='/settings' element={<Settings auth={auth} attemptLoginWithToken={ attemptLoginWithToken }/>}/>
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