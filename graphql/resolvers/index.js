const EventModel = require("../../db/models/events");
const userModel = require("../../db/models/users");
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
    }
}
