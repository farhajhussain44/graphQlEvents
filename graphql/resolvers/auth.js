const userModel = require("../../db/models/users");
const bcrypt = require('bcryptjs');
module.exports = {
    createUser: async (args) => {
        try {
            const checkExist = await userModel.findOne({ email: args.userInput.email });
            if (!checkExist) {
                const User = new userModel({
                    email: args.userInput.email,
                    password: bcrypt.hashSync(args.userInput.password, 8)
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
