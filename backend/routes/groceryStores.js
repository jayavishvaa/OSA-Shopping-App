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
            res.statusCode = 409;
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

router.put('/', authenticate.verifyUser, authenticate.verifySeller, async (req, res, next) => {
    try {
        const store = await groceryStore.findOne({seller: req.user._id });
        if(!store) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, err: "No Store registered under this user"}); 
        } else {
            if(req.body.name)
                store.name = req.body.name;
            await store.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: "Store details updated"}); 
        }
    } catch(err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err: err}); 
    }
});

router.delete('/', authenticate.verifyUser, authenticate.verifySeller, async (req, res, next) => {
    try {
        const store = await groceryStore.findOne({seller: req.user._id });
        if(!store) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, err: "No Store registered under this user"}); 
        } else {
            await store.remove();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: "Store removed"}); 
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
            res.statusCode = 404;
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

router.put('/items/:itemId', authenticate.verifyUser, authenticate.verifySeller, async (req, res, next) => {
    try {
        const store = await groceryStore.findOne({seller: req.user._id });
        if(!store || !store.items.id(req.params.itemId)) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, err: "No such Store ot item found"}); 
        } else {
            if(req.body.name)
                store.items.id(req.params.itemId).name = req.body.name;
            if(req.body.price)
                store.items.id(req.params.itemId).price = req.body.price;
            if(req.body.discount)
                store.items.id(req.params.itemId).discount = req.body.discount;
            await store.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: "Item modified"}); 
        }
    } catch(err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, err: err}); 
    }
});

router.delete('/items/:itemId', authenticate.verifyUser, authenticate.verifySeller, async (req, res, next) => {
    try {
        const store = await groceryStore.findOne({seller: req.user._id });
        if(!store || !store.items.id(req.params.itemId)) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, err: "No such Store ot item found"}); 
        } else {
            store.items.id(req.params.itemId).remove()
            await store.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: "Item removed"}); 
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