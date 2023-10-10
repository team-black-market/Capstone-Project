const express = require('express');
const app = express.Router();

app.use('/products', require('./products'));
app.use('/', require('./auth'));
app.use('/orders', require('./orders'));
app.use('/lineItems', require('./lineItems'));
app.use('/wishlist', require('./wishList'));
module.exports = app;
