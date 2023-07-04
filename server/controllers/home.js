const Phones = require("../models/Phones");

exports.list = async (req, res) => {
	console.log(req.session);
	try {
		const allPhones = await Phones.find({}).count();
		const allBrands = await Phones.aggregate([
			{ $group: { _id: "$Brand", total: { $sum: 1 } } },
			{ $count: "total" },
		]);

		const allOrigins = await Phones.aggregate([
			{ $group: { _id: "$Origin", total: { $sum: 1 } } },
			{ $count: "total" },
		]);

		console.log(allPhones);

		res.render("index", {
			allPhones: allPhones,
			allBrands: allBrands[0].total,
			allOrigins: allOrigins[0].total,
		});
	} catch (e) {
		console.log(e);
		res.status(404).send({
			message: "error rendering page",
		});
	}
};
