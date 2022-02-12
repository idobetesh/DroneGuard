const User = require('../models/user.js');

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });

    return user;
};

const getUserById = async (id) => {
    const user = await User.findById(id).select('-password');

    return user;
};

const createUser = async (email, password, name, userType) => {
    const user = await User.create({ email, password, name, userType });

    return { id: user.id, name: user.name, email: user.email };
}

exports.getUserById = getUserById;
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;
