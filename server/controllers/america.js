const Phones = require("../models/Phones");

exports.list = async (req, res) => {
	try {
		console.log(req.query);
		const message = req.query.message;
		const phones = await Phones.find({ Origin: "America" });
		res.render("america", { phones: phones, message: message });
	} catch (e) {
		res.status(404).send({ message: "could not list phones" });
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;
	try {
		await Phones.findByIdAndRemove(id);
		res.redirect("/america");
	} catch (e) {
		res.status(404).send({
			message: `could not delete phone ${id}.`,
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
			message: `could not find phone ${id}`,
		});
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;
	try {
		const phones = await Phones.updateOne({ _id: id }, req.body);
		res.redirect("/america");
	} catch (e) {
		res.status(404).send({
			message: `could not find phone ${id}`,
		});
	}
};
