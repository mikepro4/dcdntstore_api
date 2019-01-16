const mongoose = require("mongoose");
const { Schema } = mongoose;

const artworkSchema = new Schema({
    created: { type: Date, default: Date.now },
    title: String,
    description: String,
    catalogNumber: Number,
    urlName: String,
    status: {type: String, default: "private"},
    discountEnabled: {type: Boolean, default: false},
    discountAmount: {type: Number, default: 0},
    labelEnabled: {type: Boolean, default: false},
    labelId: String,
    order: Number,
    images: {
        small: String,
        medium: String,
        large: String,
    },
    sourceId: String,
    links: {
        vector: String,
        raster: String,
        instagram: String,
        dribbble: String,
        behance: String,
    }
});

mongoose.model("artworks", artworkSchema);
