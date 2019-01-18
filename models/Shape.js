const mongoose = require("mongoose");
const { Schema } = mongoose;

const shapeSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: String,
    metadata: {
        title: String,
        description: String,
        catalogNumber: {type: String, default: "0000"},
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
            small: {type: String, default: null },
            medium: {type: String, default: null },
            large: {type: String, default: null },
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

shapeSchema.index({
	"metadata.title": "text",
	"metadata.description": "text",
	"metadata.catalogNumber": "text",
    "metadata.urlName": "text"
});
shapeSchema.index({
    "metadata.status": 1,
});
shapeSchema.index({
    "metadata.isHighlighted": 1
});


const Shapes = mongoose.model("shapes", shapeSchema);

Shapes.createIndexes();

mongoose.model("shapes", shapeSchema);
