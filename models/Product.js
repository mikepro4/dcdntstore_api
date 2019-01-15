const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    created: { type: Date, default: Date.now },
    title: String,
    description: String,
    artworkId: String,
    productTypeId: String,
    status: {type: String, default: "private"},
    discountEnabled: {type: Boolean, default: false},
    discountAmount: {type: Number, default: 0},
    labelEnabled: {type: Boolean, default: false},
    labelId: String,
    order: Number,
    productSourceId: String,
    productImages: [
        {
            title: String,
            description: String,
            mainImage: {type: Boolean, default: false},
            order: Number,
            originalImage: {type: Boolean, default: false},
            images: {
                small: String,
                medium: String,
                large: String,
            }
        }
    ],
    links: {
        mainPurchaseLink: {
            url: String,
            customTitle: String
        },
        secondaryPurchaseLink: {
            url: String,
            customTitle: String
        },
    },
    c: {
        l: Number,
        v: Number,
        s: Number,
        p: Number
    }
});

mongoose.model("products", productSchema);
