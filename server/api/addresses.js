const {
  fetchAddresses,
  createAddress
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');

app.get('/:id', isLoggedIn, async(req, res, next)=> {
  const user_id = req.params.id
  try {
    res.send(await fetchAddresses(user_id));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await createAddress({ user_id: req.user.id, ...req.body }));
  }
  catch(ex){
    next(ex);
  }
});

module.exports = app;