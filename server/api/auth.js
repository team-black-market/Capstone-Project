const {
  authenticate,
  findUserByToken,
  createUser
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');

app.post('/register', async(req, res, next)=> {
  try {
    res.send(await createUser({username: req.body.username, password: req.body.password, is_admin: false}));
  } catch (ex) {
    next(ex);
  }
})

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

module.exports = app;
