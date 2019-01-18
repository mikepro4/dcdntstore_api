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
        isHighlighted: {type: Boolean, default: false},
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
        },
        math: {
            function: {type: String, default: null },
            bold: {type: Number, default: null },
            step: {type: Number, default: null },
            freq: {type: Number, default: null },
        }
    }
});

mongoose.model("shapes", shapeSchema);
