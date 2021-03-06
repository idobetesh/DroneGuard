const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING_MONGO, options, () => {
            console.log('DB Connected Successfully');
        });
    } catch (error) {
        console.error(error);
    }
};

const getDbHealth = () => {
    return mongoose.connection.readyState === 1 ? 'Ok' : 'Bad';
};


exports.connect = connect;
exports.getDbHealth = getDbHealth;
