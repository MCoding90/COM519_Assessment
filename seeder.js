const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { MONGODB_URI } = process.env;

/**
 * constants
 */
const client = new MongoClient(MONGODB_URI);

async function main() {
	try {
		await client.connect();
		const db = client.db();
		const results = await db.collection("phones").find({}).count();

		/**
		 * If existing records then delete the current collections
		 */
		if (results) {
			console.info("deleting collection");
			await db.collection("phones").drop();
		}

		/**
		 * This is just a fun little loader module that displays a spinner
		 * to the command line
		 */
		const load = loading("importing phones collection").start();

		/**
		 * Import the JSON data into the database
		 */

		const data = await fs.readFile(path.join(__dirname, "phones.json"), "utf8");
		await db.collection("phones").insertMany(JSON.parse(data));

		load.stop();
		console.info(`Created phone database`);

		process.exit();
	} catch (error) {
		console.error("error:", error);
		process.exit();
	}
}
main();
