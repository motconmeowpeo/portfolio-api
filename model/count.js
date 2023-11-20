const mongoose = require("mongoose");
const countSchema = new mongoose.Schema({
    ipAddress: {
        type: String,
        unique: true
    },
    continentCode: {
        type: String
    },
    continentName: {
        type: String
    },
    countryCode: {
        type: String
    },
    countryName: {
        type: String
    },
    stateProv: {
        type: String
    },
    city: {
        type: String
    },

})
exports.Count = new mongoose.model("Count", countSchema);





