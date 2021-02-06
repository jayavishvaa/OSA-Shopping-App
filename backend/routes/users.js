const express = require('express');
const _ = require('lodash');

const { User } = require('../models/user');
const { Shop } = require('../models/shop');

const router = express.Router();

router.get('/', async (req, res) => {
    const userId = req.query[0];
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send('No user with the given id...');
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('No user with the given id');
    res.send(user);
});

router.put('/seller', async (req, res) => {
    let seller = await User.findById(req.body._id);
    if (!seller) return res.status(404).send('No seller found');

    seller = await User.findByIdAndUpdate(req.body._id, _.pick(req.body,
        ['fullName',
        'city',
        'homeAddress',
        'landmark',
        'pinCode']),
        (err, result) => {
            if (err) console.log(err);
    });

    const token = seller.generateAuthToken();
    res.header('x-auth-token', token).send(token);
});

router.put('/customer', async (req, res) => {
    let customer = await User.findById(req.body._id);
    if (!customer) return res.status(404).send('No customer found');

    customer = await User.findByIdAndUpdate(req.body._id, _.pick(req.body,
        ['fullName',
        'city',
        'homeAddress',
        'landmark',
        'pinCode']),
        (err, result) => {
            if (err) console.log(err);
    });

    const token = customer.generateAuthToken();
    res.header('x-auth-token', token).send(token);
});

router.post('/newList', async (req, res) => {
    try {
        if (!req.body.userId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send('invalid user id');
        const user = await User.findById(req.body.userId);
        if (!user) return res.status(404).send('no user found with given id');
        await user.updateOne({ savedLists: [...user.savedLists, {
            name: req.body.listName
        }]});
        res.send("list added successfully");
    } catch (error) {
        console.log(error)
    }
});

router.get('/getSavedLists', async (req, res) =>  {
    try {
        if (!req.query.userId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send('invalid user id');
        const user = await User.findById(req.query.userId);
        if (!user) return res.status(404).send('no user found with given id');
        res.send(user.savedLists);
    } catch (error) {
        console.log(error)
    }
});

router.post('/addItemToCart', async (req, res) => {
    try {
        if (!req.body.userId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send('invalid user id');
        const user = await User.findById(req.body.userId);
        if (!user) return res.status(404).send('no user found with given id');
        
        await user.updateOne({ cartItems: [...user.cartItems, {
            ..._.pick(req.body, ['name', 'description', 'mrp', 'price', 'quantity', 'perQty']),
            shop: req.body.shopId,
            keptAt: Date.now()
        }]});
        res.send("added successfully")
    } catch (error) {
        console.log(error)
    }
});

router.post('/addItemToSavedList', async (req, res) => {
    try {
        if (!req.body.userId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send('invalid user id');
        const user = await User.findById(req.body.userId);
        if (!user) return res.status(404).send('no user found with given id');

        const list = user.savedLists.find(list => list.name === req.body.listName);
        const index = user.savedLists.indexOf(list);
        let lists = user.savedLists;
        lists[index].items.push({
            ..._.pick(req.body, ['name', 'description', 'mrp', 'price', 'quantity', 'perQty']),
            shop: req.body.shopId,
            keptAt: Date.now()
        });
        await user.updateOne({ savedLists: [...lists] });
        res.send("added successfully"); 
    } catch (error) {
        console.log(error)
    }
});

router.get("/getCartItems", async (req, res) => {
    try {
        if (!req.query.userId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send('invalid user id');
        let user = await User.findById(req.query.userId);
        if (!user) res.status(404).send("no user found with given id");
        for (index in user.cartItems) {
            const shop = await Shop.findById(user.cartItems[index].shop);
            const item = user.cartItems[index];
            user.cartItems[index] = { ..._.pick(item, [
                '_id',
                'name',
                'description',
                'mrp', 
                'price', 
                'quantity', 
                'perQty', 
                'shop', 
                'keptAt']), 
                shopDetails: _.pick(shop, [
                'shopName',
                'description',
                'streetName',
                'pinCode',
                'loactionCoordinates'
            ])}
        };
        res.send(user.cartItems)
    } catch (error) {
        console.log(error)
    }
});

router.delete('/deleteCartItem', async (req, res) => {
    try {
        if (!req.query.itemId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send('invalid item id');
        if (!req.query.userId.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send('invalid item id');
        const user = await User.findById(req.query.userId);
        if (!user) return res.status(404).send('no user found with given id');
        const item = user.cartItems.find(item => item._id.toString() === req.query.itemId);
        const index = user.cartItems.indexOf(item);
        user.cartItems.splice(index, 1);
        await user.updateOne({ cartItems: user.cartItems });
        res.send("debugging")
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;