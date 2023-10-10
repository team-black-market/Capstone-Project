import axios from 'axios';

const getHeaders = ()=> {
  return {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
};

const fetchProducts = async(setProducts)=> {
  const response = await axios.get('/api/products');
  setProducts(response.data);
};

const fetchOrders = async(setOrders)=> {
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const fetchLineItems = async(setLineItems)=> {
  const response = await axios.get('/api/lineItems', getHeaders());
  setLineItems(response.data);
};

const fetchWishlist = async({userId, setWishlist})=> {
  const response = await axios.get(`/api/wishlist/${userId}`)
  setWishlist(response.data)
}

const createLineItem = async({ product, cart, lineItems, setLineItems })=> {
  const response = await axios.post('/api/lineItems', {
    order_id: cart.id,
    product_id: product.id
  }, getHeaders());
  setLineItems([...lineItems, response.data]);
};

const updateLineItem = async({ lineItem, cart, lineItems, setLineItems })=> {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map( lineItem => lineItem.id == response.data.id ? response.data: lineItem));
};

const updateOrder = async({ order, setOrders })=> {
  await axios.put(`/api/orders/${order.id}`, order, getHeaders());
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const removeFromCart = async({ lineItem, lineItems, setLineItems })=> {
  await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
  setLineItems(lineItems.filter( _lineItem => _lineItem.id !== lineItem.id));
};

const removeFromWishlist = async(item)=> {
  await axios.delete(`/api/wishlist/${item.userId}/${item.wishItem.id}`, getHeaders())
  item.setWishlist(item.wishlist.filter((_wishItem) => _wishItem.id !== item.wishItem.id))
}

const newestProduct = async({ product, products, setProducts }) => {
  console.log(product, products, setProducts)
  try {
    const response = await axios.post('/api/products', product, getHeaders());
    setProducts(...products, response.data);
  } catch (error) {
    console.log("stinky poo poo")
    //verification or routes??
  }
};

const attemptLoginWithToken = async(setAuth)=> {
  const token = window.localStorage.getItem('token');
  if(token){
    try {
      const response = await axios.get('/api/me', getHeaders());
      setAuth(response.data);
    }
    catch(ex){
      if(ex.response.status === 401){
        window.localStorage.removeItem('token');
      }
    }
  }
}

const login = async({ credentials, setAuth })=> {
  const response = await axios.post('/api/login', credentials);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  attemptLoginWithToken(setAuth);
}

const logout = (setAuth)=> {
  window.localStorage.removeItem('token');
  setAuth({});
}

const api = {
  login,
  logout,
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  fetchWishlist,
  createLineItem,
  updateLineItem,
  updateOrder,
  removeFromCart,
  removeFromWishlist,
  attemptLoginWithToken,
  newestProduct
};

export default api;
