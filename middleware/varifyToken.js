const jwt = require("jsonwebtoken");

exports.varifyToken = async (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).send("Access denied");
	}
	try {
		const [type, tokenStr] = token.split(" ");
		if (type !== "Bearer")
			return res.status(401).send("Unauthorized request");
		if (tokenStr === null || !tokenStr)
			return res.status(401).send("Unauthorized request");
		const verifiedUser = jwt.verify(tokenStr, process.env.TOKEN_SECRET);
		if (!verifiedUser) return res.status(401).send("Unauthorized request");
		req.body.user_id = verifiedUser.id;
		next();
	} catch (error) {
		return res.json(error);
	}
};
