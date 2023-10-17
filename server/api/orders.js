const {
  fetchOrders,
  updateOrder,
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin, isVip } = require('./middleware');

app.put('/:id', isLoggedIn, isAdmin, async(req, res, next)=> {
  try {
    //TODO make sure the order's user_id is req.user.id
    res.send(await updateOrder({ ...req.body, id: req.params.id}));
  }
  catch(error){
    console.log("orders.js backend STINKY POO POO")
  }
});

app.get('/', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await fetchOrders(req.user.id));
  }
  catch(ex){
    next(ex);
  }
});

//not using isVip



module.exports = app;
