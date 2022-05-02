const router = require("express").Router();
const Goal = require("../models/Goal");


router.post("/add",
	async (req, res) => {

		const newGoal = new Goal({
			user: req.body.user,
			movement: req.body.movement,
			quantity: req.body.quantity,
			unit: req.body.unit,
			plan: req.body.plan,
			timeFrame: req.body.timeFrame,
			start: req.body.start,
			notes: req.body.notes,
		})
		try {
			const savedGoal = await newGoal.save()
			return res.status(200).json(savedGoal)
		} catch (err) {
			return res.status(500).json(err)
		}
	})

router.post("/", async (req, res) => {
	// return all goals for user
	// console.log(req.body)
	try {
		const goals = await Goal.find({
			"user": req.body.email
		})
		return res.status(200).json(goals)
	} catch (err) {
		return res.status(500).json(err)
	}
})

router.put("/", async (req, res) => {
	try {
		console.log(req.body)
		const goal = await Goal.updateOne({
			movement: req.body.movement,
			user: req.body.user,
		},
			{
				$set: {
					quantity: req.body.quantity,
					unit: req.body.unit,
					timeFrame: req.body.timeFrame,
					start: req.body.start,
					done: req.body.done,
					gaveUp: req.body.gaveUp,
					plan: req.body.plan,
					notes: req.body.notes,
				}
			})
		return res.status(200).json(goal)
	} catch (err) {
		return res.status(500).json(err)
	}
})

module.exports = router;
