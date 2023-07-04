const Phones = require("../models/Phones");

exports.list = async (req, res) => {
	try {
		console.log(req.query);
		const message = req.query.message;
		const phones = await Phones.find({});
		res.render("allphones", { phones: phones, message: message });
	} catch (e) {
		res.status(404).send({ message: "could not list phones" });
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;
	try {
		await Phones.findByIdAndRemove(id);
		res.redirect("/allphones");
	} catch (e) {
		res.status(404).send({
			message: `could not delete record ${id}.`,
		});
	}
};

exports.edit = async (req, res) => {
	const id = req.params.id;
	try {
		const phones = await Phones.findById(id);
		res.render("update-phones", { phones: phones, id: id });
	} catch (e) {
		res.status(404).send({
			message: `could not find phones ${id}`,
		});
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;
	try {
		const phones = await Phones.updateOne({ _id: id }, req.body, {
			runValidators: true,
		});
		res.redirect("/allphones");
	} catch (e) {
		res.status(404).send({
			message: `could not find phones ${id}`,
		});
	}
};

exports.create = async (req, res) => {
	try {
		const phones = new Phones({
			Brand: req.body.Brand,
			Model: req.body.Model,
			Origin: req.body.Origin,
			Released: req.body.Released,
			Display: req.body.Display,
			Processor: req.body.Processor,
			Memory: req.body.Memory,
			Battery: req.body.Battery,
		});
		await phones.save();
		res.redirect("/allphones");
	} catch (e) {
		if (e.errors) {
			console.log(e.errors);
			res.render("create-phones", { errors: e.errors });
			return;
		}
		return res.status(400).send({
			message: JSON.parse(e),
		});
	}
};
