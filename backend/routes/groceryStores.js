const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const groceryStore = require('../models/groceryStore');
const authenticate = require('../middleware/auth');
const config = require("config");
const mongoose = require('mongoose');

router.post('/', authenticate.verifyUser, authenticate.verifySeller, async (req, res, next) => {
    try {
        const Store = await groceryStore.findOne({seller: req.user._id });
        if(Store) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, err: "Store already registered under this user"}); 
        } else {
            req.body.seller = req.user._id;
            const store = await groceryStore.create(req.body);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: "Store registered"}); 
        }
    } catch(err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err: err}); 
    }
});

router.get('/', authenticate.verifyUser, async (req, res, next) => {
    try {
        const stores = await groceryStore.find({}).select('-items');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(stores);
    } catch(err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err: err}); 
    }
});


router.post('/items', authenticate.verifyUser, authenticate.verifySeller, async (req, res, next) => {
    try {
        const store = await groceryStore.findOne({seller: req.user._id });
        if(!store) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, err: "No Store registered under this user"}); 
        } else {
            store.items.push(req.body);
            await store.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: "Item added to store"}); 
        }
    } catch(err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err: err}); 
    }
});

router.get('/:storeId/items', authenticate.verifyUser, async (req, res, next) => {
    try {
        const store = await groceryStore.findById(req.params.storeId);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(store.items);
    } catch(err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err: err}); 
    }
});

module.exports = router;