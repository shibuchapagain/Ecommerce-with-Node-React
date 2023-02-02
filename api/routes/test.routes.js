const express = require("express");
const app = express();

// http://localhost:9005/api/v1/
app.get("/", (req, res) => {

    res.json({
        status: true,
        msg: "Home data fetched",
        result: "Hello World"
    });
});

// http://localhost:9005/api/v1/
app.post("/", (req, res) => {

})

// http://localhost:9005/api/v1/contact
app.put("/contact", (req, res) => {

})
// es5 stan
module.exports = app;
