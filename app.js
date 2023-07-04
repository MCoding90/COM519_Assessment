require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./server/models/User");

const app = express();

app.set("view engine", "ejs");

/**
 * Controllers (route handlers).
 */

const phonesController = require("./server/controllers/phones");
const userController = require("./server/controllers/user");
const homeController = require("./server/controllers/home");
const americaController = require("./server/controllers/america");
const japanController = require("./server/controllers/japan");
const chinaController = require("./server/controllers/china");
const koreaController = require("./server/controllers/korea");
const phonesApiController = require("./server/controllers/api/searched-phones");

const { PORT, MONGODB_URI } = process.env;

/**
 * connect to database
 */

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
	console.error(err);
	console.log(
		"MongoDB connection error. Please make sure MongoDB is running.",
		chalk.red("✗")
	);
	process.exit();
});

/***
 * We are applying our middlewear
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
	expressSession({
		secret: "foo barr",
		cookie: { expires: new Date(253402300000000) },
	})
);

app.use("*", async (req, res, next) => {
	global.user = false;
	if (req.session.userID && !global.user) {
		const user = await User.findById(req.session.userID);
		global.user = user;
	}
	next();
});

const authMiddleware = async (req, res, next) => {
	const user = await User.findById(req.session.userID);
	if (!user) {
		return res.redirect("/");
	}
	next();
};

app.get("/", homeController.list);

app.get("/allphones", phonesController.list);
app.get("/allphones/delete/:id", phonesController.delete);
app.get("/allphones/update/:id", phonesController.edit);
app.post("/allphones/update/:id", phonesController.update);

app.get("/america", americaController.list);
app.get("/america/delete/:id", americaController.delete);
app.get("/america/update/:id", americaController.edit);
app.post("/america/update/:id", americaController.update);

app.get("/japan", japanController.list);
app.get("/japan/delete/:id", japanController.delete);
app.get("/japan/update/:id", japanController.edit);
app.post("/japan/update/:id", japanController.update);

app.get("/china", chinaController.list);
app.get("/china/delete/:id", chinaController.delete);
app.get("/china/update/:id", chinaController.edit);
app.post("/china/update/:id", chinaController.update);

app.get("/korea", koreaController.list);
app.get("/korea/delete/:id", koreaController.delete);
app.get("/korea/update/:id", koreaController.edit);
app.post("/korea/update/:id", koreaController.update);

app.get("/search-phones", (req, res) => {
	res.render("search-phones", phonesApiController);
});
app.get("/api/searched-phones", phonesApiController.list);

app.get("/login", (req, res) => {
	res.render("login", { errors: {} });
});
app.post("/login", userController.login);

app.get("/register", (req, res) => {
	res.render("register", { errors: {} });
});
app.post("/register", userController.create);

app.get("/logout", async (req, res) => {
	req.session.destroy();
	global.user = false;
	res.redirect("/");
});

app.get("/create-phones", authMiddleware, (req, res) => {
	res.render("create-phones", { errors: {} });
});
app.post("/create-phones", phonesController.create);

app.listen(PORT, () => {
	console.log(
		`Example app listening at http://localhost:${PORT}`,
		chalk.green("✓")
	);
});
