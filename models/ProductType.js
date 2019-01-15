const mongoose = require("mongoose");
const { Schema } = mongoose;

const productTypeSchema = new Schema({
    created: { type: Date, default: Date.now },
    title: String,
    pluralTitle: String,
    description: String,
    urlName: String,
    status: { type: String, default: "private" },
    sources: [
        {
            sourcedId: String
        }
    ],
    images: {
        small: String,
        medium: String,
        large: String,
    },
    categoryIds: [
        {
            sourcedId: String
        }
    ]
});

mongoose.model("productTypes", productTypeSchema);
