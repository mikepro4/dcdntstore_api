const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: String,
    metadata: {
        title: String,
        description: String,
        urlName: String,
        status: {type: String, default: "private"},
        images: {
            small: String,
            medium: String,
            large: String,
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
