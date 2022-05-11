const router = require("express").Router()
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {verifyTokenAndAuth} = require("./verifyToken");
const Log = require("../models/Log");
const Goal = require("../models/Goal");

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
		if (!user) return res.status(401).json("Wrong Credentials.");
		// user exists, now check the password
		const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
		const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
		if (originalPassword !== req.body.password) return res.status(401).json("Wrong Credentials.");
		// create the token
		const accessToken = jwt.sign({
			id: user.email,
			isAdmin: user.isAdmin
		}, process.env.JWT_SEC, {expiresIn: "3d"})
		// hiding the password from the response
		const {password, ...others} = user._doc;
		const logs = await Log.find({
			"email": req.body.email
		})
		const goals = await Goal.find({
			"user": req.body.email
		})
		return res.status(200).json({user: {...others, accessToken}, logs: logs, goals: goals})
	} catch (err) {
		return res.status(500).json(err)
	}
})

// Edit user, name or password
router.put("/", async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.email
		});
		user.name = req.body.name
		const savedUser = await user.save();
		return res.status(200).json({savedUser})
	} catch (err) {
		return res.status(500).json(err)
	}
})

router.delete("/", verifyTokenAndAuth, async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.email
		})
		await user.delete();
		return res.status(200).json(`${req.body.email} deleted.`)
	} catch (err) {
		return res.status(500).json(err)

	}
})

module.exports = router;
