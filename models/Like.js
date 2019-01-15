const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
    created: { type: Date, default: Date.now },
    userId: String,
    userIp: String,
    productLike: Boolean,
    artworkLike: Boolean,
    productId: String,
    artworkId: String,
    deleted: { type: Boolean, default: false},
    desktop: String,
    OS: String,
    mobile: Boolean,
    browser: String,
});

mongoose.model("likes", likeSchema);
