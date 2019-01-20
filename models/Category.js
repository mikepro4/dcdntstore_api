const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: String,
    metadata: {
        title: {type: String, default: "Untitled"},
        description: {type: String, default: null},
        urlName: {type: String, default: "category"},
        status: {type: String, default: "private"},
        images: {
            small: {type: String, default: null},
            medium: {type: String, default: null},
            large: {type: String, default: null},
        }
    },
    parentCategories: [
		{
			categoryId: String
		}
	],
	childCategories: [
		{
			categoryId: String
		}
	]
});

mongoose.model("categories", categorySchema);
