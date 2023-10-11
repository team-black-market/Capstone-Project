const {
  fetchProducts,
  createProduct
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.get('/', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/products/:id', isLoggedIn, isAdmin, (req, res, next)=> {
  try {
    res.send('hello world');
  } catch (ex) {
    next(ex)
  }
});

app.post('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await createProduct(req.body))
  } catch (ex) {
    next(ex)
  }
});



module.exports = app;
