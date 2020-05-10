const mongoose = require("mongoose");
const connect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/bookeventtest");
        console.log("database connected")
    } catch (e) {
        console.log(e)
        console.log("error in db connection")
    }
}
module.exports = {
    connect
}