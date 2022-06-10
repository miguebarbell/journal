const router = require("express").Router();
const Goal = require("../models/Goal");
const {verifyTokenAndAuth} = require("./verifyToken");


router.post("/add",
	verifyTokenAndAuth,
	async (req, res) => {

		const newGoal = new Goal({
			user: req.body.user,
			movement: req.body.movement,
			quantity: req.body.quantity,
			unit: req.body.unit,
			plan: req.body.plan,
			timeFrame: req.body.timeFrame,
			// start: req.body.start,
			// start: (new Date(req.body.start)).setHours(0,0,0,0),
			start: (new Date(req.body.start)),
			notes: req.body.notes,
		})
		try {
			const savedGoal = await newGoal.save()
			return res.status(200).json(savedGoal)
		} catch (err) {
			return res.status(500).json(err)
		}
	})

router.post("/",
	verifyTokenAndAuth,
	async (req, res) => {
	// return all goals for user
	try {
		const goals = await Goal.find({
			"user": req.body.email
		})
		return res.status(200).json(goals)
	} catch (err) {
		return res.status(500).json(err)
	}
})

router.post("/delete",
	verifyTokenAndAuth,
	async (req, res) => {
	try {
		const goal = await Goal.findOneAndDelete({
			"user": req.body.user,
			"movement": req.body.movement
		})
		return res.status(200).json(goal)
	} catch (err) {
		return res.status(500).json(err)
	}
	})

router.put("/", async (req, res) => {
	try {
		await Goal.updateOne({
			movement: req.body.movement,
			user: req.body.user,
		},
			{
				$set: {
					quantity: +req.body.quantity,
					unit: req.body.unit,
					timeFrame: +req.body.timeFrame,
					start: (new Date(req.body.start)).setHours(0,0,0,0),
					done: req.body.done,
					gaveUp: req.body.gaveUp,
					plan: req.body.plan,
					notes: req.body.notes,
				}
			})
		const newGoal = await Goal.findOne({user: req.body.user, movement: req.body.movement})
		console.log(newGoal)
		return res.status(200).json(newGoal)
	} catch (err) {
		return res.status(500).json(err)
	}
})

module.exports = router;
