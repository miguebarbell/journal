const router = require("express").Router();

const Log = require("../models/Log");

// Create a log
router.post("/", async (req, res) => {
	const newLog = new Log(req.body)
	try {
		const savedLog = await newLog.save();
		return res.status(200).json(savedLog)
		// return res.status(200).json("Log Saved")
	} catch (err) {
		return res.status(500).json(err)
	}
})

// Edit a log
router.put("/:id", async (req, res) => {
	try {
		const savedLog = await Log.findByIdAndUpdate(
			req.params.id, {
				$set: req.body
			}
		);
		return res.status(200).json(`${req.params.id} successfully edited.`)
	} catch (err) {
		return res.status(500).json(err)
	}
})

// Delete a log
router.delete("/:id", async (req, res) => {
	try {
		await Log.findByIdAndDelete(req.params.id);
		res.status(200).json(`log ${req.params.id} deleted`)
	} catch (err) {
		res.status(500).json(err)
	}
})

// Get a log
router.get("/:id", async (req, res) => {
	try {
		const log = await Log.findByIdAndGet(req.params.id)
		return res.status(200).json(log)
	} catch (err) {
		return res.status(500).json(err)
	}
})

// Get all logs
router.get("/", async (req, res) => {
	try {
		const logs = await Log.find({user: req.body.user})
		return res.status(200).json(logs)
	} catch (err) {
		return res.status(500).json(err)
	}
})

module.exports = router;
