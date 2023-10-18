const {
  fetchProducts,
  createProduct,
  fetchReviews,
  createReview,
  updateProduct,
  deleteProduct,
  fetchProductTags,
  addProductTags
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

app.put('/:id', isLoggedIn, isAdmin, async(req, res, next)=> {
  try {
    res.send(await updateProduct({ ...req.body, id: req.params.id}));
  } catch (ex) {
    next(ex)
  }
});

app.put('/delete/:id', isLoggedIn, isAdmin, async(req, res, next)=> {
  try {
    res.send(await deleteProduct({id: req.params.id}))
  } catch (ex) {
    next(ex)
  }
})

app.post('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await createProduct(req.body))
  } catch (ex) {
    next(ex)
  }
});

app.get('/product_tags', async(req, res, next)=> {
  try {
    res.send(await fetchProductTags());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/product_tags', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await addProductTags(req.body))
  } catch (ex) {
    next(ex)
  }
})

module.exports = app;