const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

router.put('/', async (req, res) => {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (!user) return res.status(400).send('Unexpected error occured');

    await User.findOneAndUpdate({ phoneNumber: req.body.phoneNumber }, req.body, (err, result) => {
        if (err) return res.status(404).send('Bad request');
        else res.send(result);
    })
});

module.exports = router;