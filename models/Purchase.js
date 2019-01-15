const mongoose = require("mongoose");
const { Schema } = mongoose;

const purchaseSchema = new Schema({
    created: { type: Date, default: Date.now },
    userId: String,
    userIp: String,
    productPurchase: Boolean,
    artworkPurchase: Boolean,
    productId: String,
    artworkId: String,
    desktop: String,
    OS: String,
    mobile: Boolean,
    browser: String,
});

mongoose.model("purchases", purchaseSchema);
