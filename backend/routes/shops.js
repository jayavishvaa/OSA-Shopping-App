const express = require('express');
const _ = require('lodash');

const { Shop } = require('../models/shop');
const { Section } = require('../models/section');
const { User } = require('../models/user');
const { Item } = require('../models/item');
const seller = require('../middleware/seller');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const sectionQueried = req.query.apiEndPoint;
        const sectionInDb = await Section.find({ name: sectionQueried });
        const shops = await Shop.find({ pinCode: req.query.pinCode, sections: [sectionInDb] });
        if (!shops) res.send('No registered shop for this section in your area');
    
        res.status(200).send(shops);
    } catch (error) {
        console.log(error);
    }
});

router.get('/findByShopId', async (req, res) => {
    try {
        if (!req.query[0].match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send("Wrong id provided");
        const shop = await Shop.findById(req.query[0]);
        if (!shop) return res.send("no-shop-for-given-seller");
        res.send(shop);
    } catch (error) {
        console.log(error);
    }
});

router.get('/sellerSideShop', async (req, res) => {
    try {
        if (!req.query[0].match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send("Wrong id provided");
        const shop = await Shop.find({ seller: req.query[0] });
        if (!shop || shop.length === 0) return res.send("no-shop-for-given-seller");
        res.send(shop[0]);
    } catch (error) {
        console.log(error);
    }
});

router.get('/getItems', async (req, res) => {
    try {
        if (!req.query[0].match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send("wrong id provided");

        const items = await Item.find({ shop: req.query[0] });
        if (!items) return res.send("no-items-for-the-given-shop");
        res.send(items);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', seller, async (req, res) => {
    try {
        let sectionName = req.body.sections;
        sectionName = sectionName.toLowerCase();
        const section = await Section.find({ name: sectionName });
        if (!section) return console.log(sectionName);

        const shop = new Shop({
            shopName: req.body.shopName,
            description: req.body.description,
            streetName: req.body.streetName,
            pinCode: req.body.pinCode,
            sections: [section[0].name],
            seller: req.body.sellerId,
            locationCoordinates: req.body.locationCoords
        });
        await shop.save();

        const seller = await User.findById(req.body.sellerId);
        if (!seller) return res.send("invalid seller id");

        const token = seller.generateSellerAuthToken(shop._id);
        res.header('x-auth-token', token).send(token);
    } catch (error) {
        console.log(error);
    }
});

router.put('/createCategory', async (req, res) => {
    try {
        const shop = await Shop.findById(req.body.shopId);
        if (!shop) return res.send("invalid shop id provided");

        const updatedCategories = shop.categories;
        updatedCategories.push({name: req.body.categoryName});
        await shop.update({ categories: updatedCategories });
        res.send("category-created-successfully");
    } catch (error) {
        console.log(error);
    }
});

router.put('/createItem', async (req, res) => {
    try {
        const shop = await Shop.findById(req.body.shop);
        if (!shop) return res.send("invalid shop id provided");

        const item = new Item(_.pick(req.body, [
            'name',
            'description',
            'MRP',
            'sellingPrice',
            'perQty',
            'shop'
        ]));
        await item.save();

        const updatedItems = shop.items;
        updatedItems.push(item._id);
        await shop.update({ items: updatedItems })
        res.send("debugging");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;