const {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,
  findUserByToken
} = require('./db');

const express = require('express');
const app = express.Router();

const isLoggedIn = async(req, res, next)=> {
  try {
    const user = await findUserByToken(req.headers.authorization);
    req.user = user;
    next();
  }
  catch(ex){
    next(ex);
  }
};

app.post('/login', async(req, res, next)=> {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  }
  catch(ex){
    next(ex);
  }
});


app.get('/me', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user);
  } 
  catch(ex){
    next(ex);
  }
});

app.get('/products', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/orders/:id', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await updateOrder({ ...req.body, id: req.params.id}));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/orders', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchOrders(req.user.id));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/lineItems', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchLineItems(req.user.id));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/lineItems', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await createLineItem(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.put('/lineItems/:id', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await updateLineItem({...req.body, id: req.params.id}));
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/lineItems/:id', isLoggedIn, async(req, res, next)=> {
  try {
    console.log(`${req.user.username} Just deleted a lineItem`);
    await deleteLineItem({ id: req.params.id });
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

module.exports = app;
