const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const product = require("./routes/product");
const order = require("./routes/order");
const { path } = require("path");

const app = express();
app.use(express.json());
app.use("/api/products", product);
app.use("/api/orders", order);
app.use("/", (req, res) => {
    res.send("This is home");
})

mongoose.connect(process.env.DB_Connection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => console.log("connected to database"));


// heroku deployment
if(process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"build", "index.html"));
    });
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`connected to ${port}`));
