const express = require("express");
const sendMail = require("../mail");
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
    sendMail(req.body, (err, valid) => {
        if(err) res.status(500).send("Internal Error in sending mail.");
    });
    res.send(orderSaved);
});
module.exports = router;
