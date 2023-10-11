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

app.post('/:id/:itemId', isLoggedIn, async(req, res, next)=> {
    const user_id = req.params.id
    const product_id = req.params.itemId
    try {
        res.send(await createWishItem({user_id, product_id}));
    } catch (ex) {
        next(ex);
    }
});

app.delete('/:id/:itemId', isLoggedIn, async(req, res, next)=> {
    const user_id = req.params.id
    const item_id = req.params.itemId
    try {
        await deleteWishItem( user_id, item_id);
        res.sendStatus(204);
    } catch (ex) {
       next(ex);
    }
})

module.exports = app;
  