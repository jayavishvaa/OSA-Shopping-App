const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    discount: {
        type: Number,
        default: 0.00
    }
}, {
    timestamps: true
});

const groceryStoreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items:[itemSchema]
}, {
    timestamps: true
});

var GroceryStores = mongoose.model('GroceryStore', groceryStoreSchema);

module.exports = GroceryStores;