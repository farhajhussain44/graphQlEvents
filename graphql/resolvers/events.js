const EventModel = require("../../db/models/events");
const userModel = require("../../db/models/users");
module.exports = {
    events: async () => {
        try {
            return await EventModel.find().populate({
                path: "creator",
                populate: {
                    path: "createdEvent"
                }
            }).lean();
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
    }
}