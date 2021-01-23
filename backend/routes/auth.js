const express = require('express');
const _ = require('lodash');
const twilio = require('twilio');
const config = require('config');

const { User } = require('../models/user');
const { Shop } = require('../models/shop');
const seller = require('../middleware/seller');

const accountSid = config.get("accountSid"); // Your Account SID from www.twilio.com/console
const authToken = config.get("authToken");   // Your Auth Token from www.twilio.com/console
const serviceSid = config.get("serviceSid");

const client = new twilio(accountSid, authToken);

const router = express.Router();

router.get('/seller', seller, async (req, res) => {
    try {
        const sellerId = req.query._id;
        const seller = await User.findById(sellerId);
        if (!seller) return res.status(400).send('No seller found');

        res.send(_.pick(seller, ['fullName', 'homeAddress', 'landmark', 'city']));
    } catch (error) {
        console.log(error);
    }
});

router.post('/sendOTP', async (req, res) => {
    try {
        // const phone = `+91${req.body.phoneNumber}`;
        // const verification = await client.verify.services(serviceSid).verifications.create({ to: phone, channel: 'sms' });
        // res.send(verification.status);
        res.send('go ahead');
    } catch (error) {
        console.log(error);
    }
});

router.post('/verify', async (req, res) => {
    try {
        // const phone = `+91${req.body.phoneNumber}`;
        // const OTP = req.body.otp;
        // const verification_check = await client.verify.services(serviceSid).verificationChecks.create({ to: phone, code: OTP });
        // if (verification_check.status !== 'approved') return res.status(400).send(verification_check.status);

        let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
        if (!user) user = new User({ phoneNumber: req.body.phoneNumber });
        await user.save();
        
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(token);
    } catch (error) {
        console.log(error);
    }
});

router.post('/verifySeller', async (req, res) => {
    try {
        // const phone = `+91${req.body.phoneNumber}`;
        // const OTP = req.body.otp;
        // const verification_check = await client.verify.services(serviceSid).verificationChecks.create({ to: phone, code: OTP });
        // if (verification_check.status !== 'approved') return res.status(400).send(verification_check.status);

        let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
        if (!user) user = new User({ phoneNumber: req.body.phoneNumber, roles: 'seller' });
        if (user.roles !== 'seller') user.roles = 'seller';
        await user.save();
        const shop = await Shop.find({ seller: user._id });
        if (!shop) {
            const token = user.generateAuthToken();
            res.header('x-auth-token', token).send(token);
            return;
        } else {
            const token = user.generateSellerAuthToken(shop[0]._id.toString());
            res.header('x-auth-token', token).send(token);
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;