const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const auth = async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	console.log("token", token);
	try {
		const decodedValue = await admin.auth().verifyIdToken(token);
		console.log("decodedValue", decodedValue);
		if (decodedValue) {
			return next();
		}

		return res.status(500).json({ message: "unauthorixed" });
	} catch (error) {
		console.log("error", error);
		return res.status(500).json({ error });
	}
};

module.exports = auth;
