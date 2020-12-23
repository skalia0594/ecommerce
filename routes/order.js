const express = require("express");
const Order = require("../models/Order");
const router= express.Router();

router.get("", async (req, res) => {

});

router.post("/", async (req, res) => {
    if(!req.body.name || !req.body.email ||
        !req.body.address || !req.body.total ||
        !req.body.cartItems) {
            res.send({message: "Data is required!"});
    }
    const order = new Order(req.body);
    const orderSaved = await order.save();
    res.send(orderSaved);
});
module.exports = router;
