const router = require("express").Router();
const Goal = require("../models/Goal");


router.post("/",
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

router.get("/", async (req, res) => {
	try {
		const goals = await Goal.find({
			"user": req.body.user
		})
		return res.status(200).json(goals)
	} catch (err) {
		return res.status(500).json(err)
	}
})

module.exports = router;
