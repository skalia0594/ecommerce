const express = require("express");
const router = express.Router();
const Products = require("../models/Products");

router.get("/product", async (req, res) => {
    const products = await Products.find({});
    res.send(products);
});
router.post("/product", async (req, res) => {
    const newProduct = new Products(req.body);
    const saveProduct = await newProduct.save();
    res.send(saveProduct);
});
router.delete("/:product/:id", async (req, res) => {
    const deleteProduct = await Products.findByIdAndDelete(req.params.id);
    res.send(deleteProduct);
});
module.exports = router;