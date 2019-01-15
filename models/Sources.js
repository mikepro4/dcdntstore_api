const mongoose = require("mongoose");
const { Schema } = mongoose;

const sourceSchema = new Schema({
    created: { type: Date, default: Date.now },
    title: String,
    subTitle: String,
    description: String,
    storeUrl: String,
    images: {
        favicon: String,
        small: String,
        medium: String,
        large: String,
    },
    buyButtonLabel: String
});

mongoose.model("sources", sourceSchema);
