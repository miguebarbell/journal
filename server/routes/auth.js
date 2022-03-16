const router = require("express").Router()
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register a user, with an encrypted password
router.post("/register", async (req, res) => {
	// console.log(req.body)
	const newUser = new User({
		email: req.body.email,
		password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
		name: req.body.name,
	});
	try {
		const savedUser = await newUser.save();
		// Just return the necessary information
		const {password, name, email, ...others} = savedUser._doc;
		return res.status(200).json({status:'Created new user.',name:name,email:email})
	} catch (err) {
		console.error(err);
		return res.status(500).json(err)
	}
})

// Login a user, the error from a bad email or a bad password must be the same, makes it more secure.
router.post("/login", async (req, res) => {
	// console.log(req.body)
	try {
		const user = await User.findOne({
			email: req.body.email
		});
		// check the email if the user exist
		!user && res.status(401).json("Wrong Credentials.");
		// user exists, now check the password
		const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
		const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
		originalPassword !== req.body.password && res.status(401).json("Wrong Credentials.");
		// create the token
		const accessToken = jwt.sign({
			id: user.email,
		}, process.env.JWT_SEC, {expiresIn: "3d"})
		// hiding the password from the response
		const {password, ...others} = user._doc;
		return res.status(200).json({...others, accessToken})
	} catch (err) {
		console.log(err);
		return res.status(500).json(err)
	}
})

// Edit user, name or password
router.put("/", async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.user.email
		});
		user.name = req.body.user.name
		const savedUser = await user.save();
		res.status(200).json({savedUser})
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router;
