const userModel = require("../../db/models/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    },
    login: async ({ email, password }) => {
        try {
            const ChcekUser = await userModel.findOne({ email }).lean();
            if (ChcekUser) {
                const comparePassword = bcrypt.compareSync(password, ChcekUser.password);
                if (comparePassword) {
                    const token = jwt.sign({ userId: ChcekUser._id, email: ChcekUser.email }, '%%secret%%', {
                        expiresIn: '1h'
                    })
                    return { userId: ChcekUser._id, token, tokenExpiration: 1 }

                } else {
                    throw new Error('Incorrect password !!')
                }
            } else {
                throw new Error('User not found !!')
            }
        } catch (e) {
            throw e
        }
    }
}
