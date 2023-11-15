const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: false,
    },
    message: {
        type: String,
        require: true
    },
    resolved: {
        type: Boolean,
        require: true
    },
    createAt: {
        type: String,
        require: true
    },
    resolvedAt: {
        type: String,
    }
});

exports.Contact = new mongoose.model("Contact", contactSchema);





