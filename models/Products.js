const mongoose = require("mongoose");

const products= mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availableSizes: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true}); 
module.exports = mongoose.model("Products", products);