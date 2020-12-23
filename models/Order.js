const mongoose = require("mongoose");

const order = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    total: {type: Number, required: true},
    cartItems: [{ _id: String, title: String, price: Number, count: Number}],
}, {timeStamp: true});

module.exports = mongoose.model("Orders", order);