const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const product = require("./routes/product");

const app = express();
app.use(express.json());
app.use("/api", product);
app.use("/", (req, res) => {
    res.send("This is home");
})

mongoose.connect(process.env.DB_Connection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => console.log("connected to database"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`connected to ${port}`));
