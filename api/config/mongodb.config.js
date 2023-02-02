const mongoose = require("mongoose");
const Config = require("./config");

mongoose.connect(Config.MONGO_URL).then((res)=> {
    console.log("DB service connected....")
})
.catch((err) => {
    console.log("Error: ", err)
})