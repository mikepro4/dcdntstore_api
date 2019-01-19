const requireLogin = require("../middlewares/requireLogin");
const _ = require("lodash");
const mongoose = require("mongoose");
const Category = mongoose.model("categories");

module.exports = app => {

	// ===========================================================================

	app.post("/categories/search", async (req, res) => {
		const { criteria, sortProperty, offset, limit, order } = req.body;
		let adjustSortProperty 
		if (sortProperty == "createdAt") {
			adjustSortProperty = sortProperty
		} else {
			adjustSortProperty = "metadata." + sortProperty
		}
		const query = Category.find(buildQuery(criteria))
			.sort({ [adjustSortProperty]: order })
			.skip(offset)
			.limit(limit);

		return Promise.all(
			[query, Category.find(buildQuery(criteria)).countDocuments()]
		).then(
			results => {
				return res.json({
					all: results[0],
					count: results[1],
					offset: offset,
					limit: limit
				});
			}
		);
	});

	// ===========================================================================

	app.post("/categories/create", requireLogin, async (req, res) => {
		const category = await new Category({
			reatedBy: req.user._id,
			createdAt: new Date(),
			metadata: req.body.metadata,
		}).save();
		res.json(category);
	});

	// ===========================================================================

	app.post("/categories/update", requireLogin, async (req, res) => {
		Category.update(
			{
				_id: req.body.categoryId
			},
			{
				$set: { metadata: req.body.newCategory }
			},
			async (err, info) => {
				if (err) res.status(400).send({ error: "true", error: err });
				if (info) {
					Category.findOne({ _id: req.body.categoryId }, async (err, category) => {
						if (category) {
							res.json({ success: "true", info: info, category: category });
						}
					});
				}
			}
		);
	});

	// ===========================================================================

	app.post("/categories/delete", requireLogin, async (req, res) => {
		Category.remove({ _id: req.body.categoryId }, async (err) => {
			if (err) return res.send(err);
			res.json({
				success: "true",
				message: "deleted category"
			});
		});
	});

	// ===========================================================================

	app.post("/categories/details", async (req, res) => {
		Category.findOne({ _id: req.body.categoryId }, async (err, category) => {
			if (category) {
				res.json(category);
			}
		});
	});

	// ===========================================================================
};

const buildQuery = criteria => {
	const query = {};

	return query
};
