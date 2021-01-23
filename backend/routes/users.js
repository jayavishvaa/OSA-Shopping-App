const express = require('express');
const _ = require('lodash');

const { User } = require('../models/user');

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

module.exports = router;