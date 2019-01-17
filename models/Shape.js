const mongoose = require("mongoose");
const { Schema } = mongoose;

const shapeSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: String,
    metadata: {
        title: String,
        description: String,
        catalogNumber: {type: String, default: "DCDNT – 0000"},
        urlName: {type: String, default: "shape"},
        status: {type: String, default: "private"},
        discountEnabled: {type: Boolean, default: false},
        discountAmount: {type: Number, default: 0},
        labelEnabled: {type: Boolean, default: false},
        labelId: String,
        order: Number,
        isHighlighted: Boolean,
        highlightedOrder: Number,
        images: {
            small: String,
            medium: String,
            large: String,
        },
        links: {
            vectorPurchase: String,
            rasterPurchase: String,
            instagram: String,
            dribbble: String,
            behance: String,
        }
    }
});

mongoose.model("shapes", shapeSchema);
