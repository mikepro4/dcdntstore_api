const mongoose = require("mongoose");
const { Schema } = mongoose;

const clickSchema = new Schema({
    created: { type: Date, default: Date.now },
    userId: String,
    userIp: String,
    desktop: String,
    OS: String,
    mobile: Boolean,
    browser: String,
    anonymous: Boolean,
    referenceName: String,
    artworkId: String,
    productId: String
});

mongoose.model("clicks", clickSchema);
