const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const auth = require("./middleware/middleware");
const admin = require("firebase-admin");

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(compression());
app.use(helmet());

app.use(auth);
const port = 4000;

app.get("/api/todos", async (req, res) => {
	try {
		const query = db.collection("videos");
		let response = [];

		await query.get().then((data) => {
			let docs = data.docs;

			docs.map((d) => {
				response.push(d.data());
			});
			return response;
		});
		return res.status(200).send({ data: response });
	} catch (error) {
		console.log("error", error);
		return res.status(500).send({ status: "Failed", msg: error });
	}

	// console.log("token", token);
});

app.listen(process.env.PORT || port, () => {
	console.log("server running in 4000");
});
