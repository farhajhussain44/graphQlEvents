const EventModel = require("../../db/models/events");
const userModel = require("../../db/models/users");
const bookingModel = require("../../db/models/bookings");
const bcrypt = require('bcryptjs');
module.exports = {
    events: async () => {
        try {
            let events = await EventModel.find().populate({
                path: "creator",
                populate: {
                    path: "createdEvent"
                }
            }).lean();
            return events;
        } catch (e) {
            throw e
        }
    },
    bookings: async () => {
        try {
            const bookings = await bookingModel.find().populate({
                path: "user"
            }).populate({
                path: "event"
            }).lean();
            return bookings;
        } catch (e) {
            throw e
        }
    },
    createEvent: async (args) => {
        try {
            const event = {
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date,
                creator: "5eb4708beeb08c13397eeba0"
            }
            const saveEvent = new EventModel(event);
            await saveEvent.save();
            await userModel.updateOne({ _id: saveEvent.creator }, {
                $push: {
                    createdEvent: saveEvent._id
                }
            })
            return event;
        } catch (e) {
            throw e;
        }
    },
    createUser: async (args) => {
        try {
            const checkExist = await userModel.findOne({ email: args.userInput.email });
            if (!checkExist) {
                const hash = bcrypt.hashSync(args.userInput.password, 8);
                const User = new userModel({
                    email: args.userInput.email,
                    password: hash
                });
                return await User.save();
            } else {
                throw new Error("User alreday exist")
            }
        } catch (e) {
            throw e;
        }
    },
    bookEvent: async (args) => {
        try {
            const checkEventExist = await EventModel.findById(args.eventId);
            if (checkEventExist) {
                const { _id } = checkEventExist;
                const booking = new bookingModel({
                    user: "5eb4708beeb08c13397eeba0",
                    event: _id
                });
                await booking.save();
                const bookings = await bookingModel.findById(booking._id).populate({
                    path: "user"
                }).populate({ path: "event" }).lean();
                return bookings;
            } else {
                throw new Error("Event does not exist")
            }
        } catch (e) {
            throw e;
        }
    },
    cancelBooking: async (args) => {
        try {
            const booking = await bookingModel.findById(args.bookingId).populate({
                path: "event"
            }).lean();
            await bookingModel.deleteOne({ _id: args.bookingId });
            return booking;
        } catch (e) {
            throw e
        }
    }
}
