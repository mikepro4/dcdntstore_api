const mongoose = require("mongoose");
const { Schema } = mongoose;

const labelSchema = new Schema({
    created: { type: Date, default: Date.now },
    title: String,
    description: String,
    urlName: String,
    status: {type: String, default: "private"},
    color: String,
    position: String,
    images: {
        small: String,
        medium: String,
        large: String,
    },
});

mongoose.model("labels", labelSchema);
