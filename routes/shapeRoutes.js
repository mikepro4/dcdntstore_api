const requireLogin = require("../middlewares/requireLogin");
const _ = require("lodash");
const mongoose = require("mongoose");
const Shape = mongoose.model("shapes");

module.exports = app => {

	// ===========================================================================

	app.post("/shapes/search", async (req, res) => {
		const { criteria, sortProperty, offset, limit, order } = req.body;
		let adjustSortProperty 
		if (sortProperty == "createdAt") {
			adjustSortProperty = sortProperty
		} else {
			adjustSortProperty = "metadata." + sortProperty
		}
		const query = Shape.find(buildQuery(criteria))
			.sort({ [adjustSortProperty]: order })
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

	if (criteria.title) {
		_.assign(query, {
			"metadata.title": {
				$regex: new RegExp("^" + criteria.title),
				$options: "i"
			}
		});
	}

	if (criteria.description) {
		_.assign(query, {
			"metadata.description": {
				$regex: new RegExp("^" + criteria.description),
				$options: "i"
			}
		});
	}

	if (criteria.catalogNumber) {
		_.assign(query, {
			"metadata.catalogNumber": {
				$regex: new RegExp("^" + criteria.catalogNumber),
				$options: "i"
			}
		});
	}

	if (criteria.urlName) {
		_.assign(query, {
			"metadata.urlName": {
				$regex: new RegExp("^" + criteria.urlName),
				$options: "i"
			}
		});
	}

	if (criteria.status) {
		_.assign(query, {
			"metadata.status": {
				$eq: criteria.status
			}
		});
	}

	if (criteria.isHighlighted) {
		_.assign(query, {
			"metadata.isHighlighted": {
				$eq: criteria.isHighlighted
			}
		});
	}

	return query
};
