const requireLogin = require("../middlewares/requireLogin");
const _ = require("lodash");
const mongoose = require("mongoose");
const Shape = mongoose.model("shapes");

module.exports = app => {

	// ===========================================================================

	app.post("/shapes/search", async (req, res) => {
		const { criteria, sortProperty, offset, limit, order } = req.body;
		const query = Shape.find(buildQuery(criteria))
			.sort({ [sortProperty]: order })
			.skip(offset)
			.limit(limit);

		return Promise.all(
			[query, Shape.find(buildQuery(criteria)).countDocuments()]
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

	app.post("/shapes/create", requireLogin, async (req, res) => {
		const shape = await new Shape({
			reatedBy: req.user._id,
			createdAt: new Date(),
			metadata: req.body.metadata,
		}).save();
		res.json(shape);
	});

	// ===========================================================================

	app.post("/shapes/update", requireLogin, async (req, res) => {
		Shape.update(
			{
				_id: req.body.shapeId
			},
			{
				$set: { metadata: req.body.newShape }
			},
			async (err, info) => {
				if (err) res.status(400).send({ error: "true", error: err });
				if (info) {
					Shape.findOne({ _id: req.body.shapeId }, async (err, shape) => {
						if (shape) {
							res.json({ success: "true", info: info, shape: shape });
						}
					});
				}
			}
		);
	});

	// ===========================================================================

	app.post("/shapes/delete", requireLogin, async (req, res) => {
		Shape.remove({ _id: req.body.shapeId }, async (err) => {
			if (err) return res.send(err);
			res.json({
				success: "true",
				message: "deleted  shape"
			});
		});
	});

	// ===========================================================================

	app.post("/shapes/details", async (req, res) => {
		Shape.findOne({ _id: req.body.shapeId }, async (err, shape) => {
			if (shape) {
				res.json(shape);
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
};
