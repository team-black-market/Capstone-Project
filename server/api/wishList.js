const {
    fetchWishItems,
    createWishItem,
    deleteWishItem
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');
  
app.get('/:id', async(req, res, next)=> {
    const user_id = req.params.id
    try {
      res.send(await fetchWishItems( user_id ));
    }
    catch(ex){
      next(ex);
    }
});

app.post('/:id', isLoggedIn, isAdmin, async(req, res, next)=> {
    try {
        res.send(await createWishItem(req.body));
    } catch (ex) {
        next(ex);
    }
});

app.delete('/:id', isLoggedIn, async(req, res, next)=> {
    const user_id = req.params.id
    try {
        await deleteWishItem( user_id, req.body.id);
        res.sendStatus(204);
    } catch (ex) {
       next(ex);
    }
})

module.exports = app;
  