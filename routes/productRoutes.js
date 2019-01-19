const requireLogin = require("../middlewares/requireLogin");
const _ = require("lodash");
const mongoose = require("mongoose");
const Product = mongoose.model("products");

module.exports = app => {

	// ===========================================================================

	app.post("/products/search", async (req, res) => {
		const { criteria, sortProperty, offset, limit, order } = req.body;
		let adjustSortProperty 
		if (sortProperty == "createdAt") {
			adjustSortProperty = sortProperty
		} else {
			adjustSortProperty = "metadata." + sortProperty
		}
		const query = Product.find(buildQuery(criteria))
			.sort({ [adjustSortProperty]: order })
			.skip(offset)
			.limit(limit);

		return Promise.all(
			[query, Product.find(buildQuery(criteria)).countDocuments()]
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

	app.post("/products/create", requireLogin, async (req, res) => {
		const product = await new Product({
			reatedBy: req.user._id,
			createdAt: new Date(),
			metadata: req.body.metadata,
		}).save();
		res.json(product);
	});

	// ===========================================================================

	app.post("/products/update", requireLogin, async (req, res) => {
		Product.update(
			{
				_id: req.body.productId
			},
			{
				$set: { metadata: req.body.newProduct }
			},
			async (err, info) => {
				if (err) res.status(400).send({ error: "true", error: err });
				if (info) {
					Product.findOne({ _id: req.body.productId }, async (err, product) => {
						if (product) {
							res.json({ success: "true", info: info, product: product });
						}
					});
				}
			}
		);
	});

	// ===========================================================================

	app.post("/products/delete", requireLogin, async (req, res) => {
		Product.remove({ _id: req.body.productId }, async (err) => {
			if (err) return res.send(err);
			res.json({
				success: "true",
				message: "deleted  product"
			});
		});
	});

	// ===========================================================================

	app.post("/products/details", async (req, res) => {
		Product.findOne({ _id: req.body.productId }, async (err, product) => {
			if (product) {
				res.json(product);
			}
		});
	});

	// ===========================================================================
};

const buildQuery = criteria => {
	const query = {};

	if (criteria.userId) {
		_.assign(query, {
			"createdBy": {
				$eq: criteria.userId
			}
		});
	}

	if (criteria.title) {
		_.assign(query, {
			"metadata.title": {
				$regex: new RegExp(criteria.title),
				$options: "i"
			}
		});
	}

	if (criteria.description) {
		_.assign(query, {
			"metadata.description": {
				$regex: new RegExp(criteria.description),
				$options: "i"
			}
		});
	}

	if (criteria.shapeId) {
		_.assign(query, {
			"metadata.shapeId": {
				$eq: criteria.shapeId
			}
		});
	}

	return query
};
