function seller(req, res, next) {
    if (req.user.roles !== 'seller') return res.status(403).send('Access denied...');

    next();
}

module.exports = seller;