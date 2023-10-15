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

const fetchReviews = async(setReviews)=> {
  const response = await axios.get('/api/products/reviews');
  setReviews(response.data);
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

const minusLineItem = async({ lineItem, cart, lineItems, setLineItems })=> {
  if(lineItem.quantity > 1){

    const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
      quantity: lineItem.quantity - 1,
      order_id: cart.id
    }, getHeaders());
    setLineItems(lineItems.map( lineItem => lineItem.id == response.data.id ? response.data: lineItem));
  } else {
    await axios.delete(`/api/lineItems/${lineItem.id}`);
    setLineItems(lineItems.filter( _lineItem => _lineItem.id !== lineItem.id));
  }
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

const removeFromWishlist = async({userId, wishItem, setWishlist, wishlist})=> {
  await axios.delete(`/api/wishlist/${userId}/${wishItem.id}`, getHeaders())
  setWishlist(wishlist.filter((_wishItem) => _wishItem.id !== wishItem.id))
}

const addToWishList = async({userId, wishItem, setWishlist, wishlist})=> {
  const {data} = await axios.post(`/api/wishlist/${userId}/${wishItem.id}`, {}, getHeaders())
  setWishlist([...wishlist, data])
}

const newestProduct = async(items) => {
    const response = await axios.post('/api/products', items.product, getHeaders());
    items.setProducts([...items.products, response.data]);
};

const updateProduct = async(items) => {
  try {
    const response = await axios.put(`/api/products/${items.updatedProduct.id}`, items.updatedProduct, getHeaders());
    items.setProducts(items.products.map( product => product.id == response.data.id ? response.data: product));
  } catch (ex) {
    console.log(ex);
  }
};

const newReview = async(items) => {
  try {
    const response = await axios.post(`/api/products/${items.id}`, items.review, getHeaders());
    items.setReviews([...items.reviews, response.data]);
  } catch (ex) {
    console.log(ex);
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

const registerUser = async(newUserInfo)=> {
  const response = await axios.post('/api/register', newUserInfo.credentials)
  newUserInfo.setMessage(response)
}

const updateUser = async({credentials, setUsernameMessage})=> {
  const response = await axios.put('/api/updateUser', credentials)
  setUsernameMessage(response)
}

const updatePass = async({credentials, setPasswordMessage})=> {
  const response = await axios.put('/api/updatePass', credentials)
  setPasswordMessage(response)
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
  addToWishList,
  updateLineItem,
  updateUser,
  updatePass,
  minusLineItem,
  updateOrder,
  removeFromCart,
  removeFromWishlist,
  attemptLoginWithToken,
  newestProduct,
  registerUser,
  newReview,
  fetchReviews,
  updateProduct
};

export default api;
