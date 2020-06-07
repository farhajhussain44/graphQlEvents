const EventModel = require("../../db/models/events");
const bookingModel = require("../../db/models/bookings");
module.exports = {
    bookings: async () => {
        try {
            return await bookingModel.find().populate({
                path: "user"
            }).populate({
                path: "event"
            }).lean();
        } catch (e) {
            throw e
        }
    },
    bookEvent: async (args, req) => {
        try {
            if (req.isAuth) {
                const checkEventExist = await EventModel.findById(args.eventId);
                if (checkEventExist) {
                    const { _id } = checkEventExist;
                    const booking = new bookingModel({
                        user: req.userId,
                        event: _id
                    });
                    await booking.save();
                    return await bookingModel.findById(booking._id).populate({
                        path: "user"
                    }).populate({ path: "event" }).lean();
                } else {
                    throw new Error("Event does not exist")
                }
            } else {
                throw new Error('Authentication required !!')
            }
        } catch (e) {
            throw e;
        }
    },
    cancelBooking: async (args, req) => {
        try {
            if (req.isAuth) {
                const booking = await bookingModel.findById(args.bookingId).populate({
                    path: "event"
                }).lean();
                await bookingModel.deleteOne({ _id: args.bookingId });
                return booking;
            } else {
                throw new Error('Authentication required !!')
            }
        } catch (e) {
            throw e
        }
    }
}
