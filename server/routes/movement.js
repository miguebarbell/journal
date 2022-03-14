const router = require("express").Router();
const Movement = require("../models/Movement");

// Create
router.post("/", async (req, res) => {
	const newMovement = new Movement({
		user: req.body.user,
		name: req.body.name,
		partOfTheBody: req.body.partOfTheBody,
		description: req.body.description,
		execution: req.body.exercise,
	})
	try {
		const savedMovement = await newMovement.save()
		return res.status(200).json(savedMovement)
	} catch (err) {
		console.log(err);
		return res.status(500).json(err)
	}
})

// Get all public movements and own movements
router.get("/", async (req, res) => {
	try {
		const userMovements = await Movement.find({user : req.body.user})
		const defaultMovements = await Movement.find({user: "default"})
		res.status(200).json({default: defaultMovements, userMovements: userMovements})
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router;
