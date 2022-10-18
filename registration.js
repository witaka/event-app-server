const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RegistrationsSchema = new Schema({
    //By default, Mongoose adds an _id property to your schemas
    first_name: String,
    last_name: String,
    email: String,
    phone_number: String,
    age: Number,
    country: String,
    registered_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Registration', RegistrationsSchema);

