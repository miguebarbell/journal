// Filter the edits for every user.
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token
	if (authHeader) {
		// Token.
		const token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.JWT_SEC, (err, user) => {
			// not valid.
			if (err) return res.status(403).json("Token is not valid.")
			req.user = user;
			next();
		})
	} else {
		// No token.
		return res.status(401).json("You are not authenticated.")
	}
}

const verifyTokenAndAuth = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.body.user || req.user.isAdmin) {
			next();

		} else {
			return res.status(403).json("Not Allowed.")
		}
	})
}

const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next()
		} else {
			return res.status(403).json("Not Allowed.")
		}
	})
}

module.exports = {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin};
