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
        const shops = await Shop.find({ pinCode: req.query.pinCode, sections: [req.query.apiEndPoint] });
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

router.get('/getCategories', async (req, res) => {
    try {
        if (!req.query.shopId.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send("wrong id provided");

        const shop = await Shop.findById(req.query.shopId);
        if (!shop) return res.status(400).send("invalid id");

        res.send(shop.categories);
    } catch (error) {
        console.log(error)
    }
});

router.get('/getItems', async (req, res) => {
    try {
        if (!req.query.shopId.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send("wrong id provided");

        if (!req.query.categoryName) {
            const items = await Item.find({ shop: req.query.shopId });
            if (!items) return res.send("no-items-for-the-given-shop");
            res.send(items);
        } else {
            const items = await Item.find({
                shop: req.query.shopId,
                shopCategory: req.query.categoryName
            })
            res.send(items);
        }
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
        await shop.updateOne({ categories: updatedCategories });
        res.send("category-created-successfully");
    } catch (error) {
        console.log(error);
    }
});

router.post('/createItem', async (req, res) => {
    try {
        const shop = await Shop.findById(req.body.shop);
        if (!shop) return res.send("invalid shop id provided");

        const item = new Item({ ...req.body });
        await item.save();

        res.send("debugging");
    } catch (error) {
        console.log(error);
    }
});

router.put('/editItem', async (req, res) => {
    try {
        const shop = await Shop.findById(req.body.shop);
        if (!shop) return res.send("invalid shop id provided");

        const item = await Item.findByIdAndUpdate(req.body._id, {
            name: req.body.name,
            description: req.body.description,
            MRP: req.body.MRP,
            sellingPrice: req.body.sellingPrice,
            perQty: req.body.perQty,
            dated: Date.now()
        }, (err, result) => {
            if (err) return res.status(404).send("problem in updation")
        })
        if (!item) return res.status(404).send("no item with given id");
        res.send("successfully updated");
    } catch (error) {
        console.log(error);
    }
});

router.delete('/deleteItem', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.query[0], (err, result) => {
            if (err) return res.status(404).send("problem in deletion")
            else res.send("successfully deleted")
        })
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;