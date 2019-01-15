const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    created: { type: Date, default: Date.now },
    title: String,
    description: String,
    urlName: String,
    status: {type: String, default: "private"},
    images: {
        small: String,
        medium: String,
        large: String,
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
