const { User } = require('../models/user');

async function seller(req, res, next) {
    const sellerId = req.body.sellerId;
    const user = await User.findById(sellerId);
    if (!user) return res.status(404).send("No seller found or invalid id provided");
    if (user.roles !== 'seller') return res.status(403).send('Access denied...');

    next();
}

module.exports = seller;