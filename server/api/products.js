const {
  fetchProducts,
  createProduct,
  fetchReviews,
  createReview
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
// need to use this for the edit function 

app.post('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await createProduct(req.body))
  } catch (ex) {
    next(ex)
  }
});

app.get('/reviews', async(req, res, next)=> {
  try {
    res.send(await fetchReviews());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/:id', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await createReview(req.body))
  } catch (ex) {
    next(ex)
  }
});

module.exports = app;