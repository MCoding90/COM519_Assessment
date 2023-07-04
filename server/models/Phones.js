const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema(
	{
		Brand: { type: String, required: [true, "Brand is required"] },
		Model: { type: String, required: [true, "Model is required"] },
		Origin: { type: String, required: [true, "Origin is required"] },
		Released: { type: String, required: [true, "Released is required"] },
		Processor: { type: String, required: [true, "Processor is required"] },
		Display: { type: String, required: [true, "Display is required"] },
		Memory: { type: String, required: [true, "Memory is required"] },
		Battery: { type: String, required: [true, "Battery is required"] },

		Brand_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Brand",
		},
		Origin_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Origin",
		},
	},
	{ timestamps: true }
);

phoneSchema.index({ "$**": "text" });
module.exports = mongoose.model("Phones", phoneSchema);
