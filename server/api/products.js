const {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
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

module.exports = app;