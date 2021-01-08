const express = require('express');

const { Shop } = require('../models/shop');
const { Section } = require('../models/section');

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

module.exports = router;