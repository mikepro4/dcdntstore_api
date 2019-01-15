const mongoose = require("mongoose");
const { Schema } = mongoose;

const viewSchema = new Schema({
    created: { type: Date, default: Date.now },
    userId: String,
    userIp: String,
    anonymous: Boolean,
    productView: Boolean,
    artworkView: Boolean,
    pageView: Boolean,
    productId: String,
    artworkId: String,
    pageUrl: String,
    desktop: String,
    OS: String,
    mobile: Boolean,
    browser: String,
});

mongoose.model("views", viewSchema);
