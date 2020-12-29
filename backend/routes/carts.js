const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/auth');
const User = require('../models/user');
const groceryStore = require('../models/groceryStore');
const config = require("config");

router.post('/add', authenticate.verifyUser, authenticate.verifySeller, async (req, res, next) => {
    try {
        if(!req.body.item || !req.body.store) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, err: "Insufficient info"}); 
        } else {
            var flag = -1;
            const user = await User.findById(req.user._id);
            user.cart.every((cartItem, index) => {
                if(cartItem.item == req.body.item && cartItem.store == req.body.store)
                {
                    flag = index;
                }
            });
            if(flag != -1){
                user.cart[flag].quantity += req.body.quantity;
                await user.save();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, status: "Items added"});
            } else {
                console.log("here1");
                const store = await groceryStore.findById(req.body.store);
                if(store.items.id(req.body.item)) {
                    req.body.seller = store.seller;
                    req.body.price = store.items.id(req.body.item).price;
                    req.body.name = store.items.id(req.body.item).name;
                    user.cart.push(req.body);
                    await user.save();
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: "Items added to cart"}); 
                } else {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: false, err: "Invlaid item"}); 
                }
            }
        }
    } catch(err) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err: err}); 
    }
});

module.exports = router;