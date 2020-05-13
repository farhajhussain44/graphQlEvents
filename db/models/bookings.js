const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: "event"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
});
const bookingModel = mongoose.model("bookings", bookingSchema);
module.exports = bookingModel;