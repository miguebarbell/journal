const log1StartDate = new Date()
log1StartDate.setDate(log1StartDate.getDate() - 60)
const log2StartDate = new Date()
log2StartDate.setDate(log2StartDate.getDate() - 50)
const goal1StartDate = new Date()
goal1StartDate.setDate(goal1StartDate.getDate() - 60)
const goal2StartDate = new Date()
goal2StartDate.setDate(goal2StartDate.getDate() - 50)
const demoUserGoals = [
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"quantity": 200,
		"unit": "kgs",
		"plan": "test",
		"timeFrame": 90,
		"start": goal1StartDate,
		"notes": "This should end for the same day of the competition."
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"quantity": 80000,
		"unit": "mts",
		"plan": "accu",
		"timeFrame": 60,
		"start": goal2StartDate,
		"notes": "Medic advice."
	},

]

const demoUserLogs = [
	// run
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 2),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 2),
		"notes": "ten percent!"
	},

	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 4000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 3),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 10000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 1),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 2),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 3),
		"notes": "ten percent!"
	},

	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 4000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 2),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 10000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 2),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 2),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 3),
		"notes": "ten percent!"
	},

	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 4000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 1),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 10000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 1),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 2),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 3),
		"notes": "ten percent!"
	},

	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 4000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 1),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 10000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 1),
		"notes": "ten percent!"
	},

	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 2),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 3),
		"notes": "ten percent!"
	},

	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 4000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 2),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 10000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 2),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 2),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 3),
		"notes": "ten percent!"
	},

	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 4000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 1),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 10000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 1),
		"notes": "ten percent!"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Run",
		"reps": 1,
		"sets": 1,
		"strain": 8000,
		"unit": "mts",
		"duration": 60,
		"date": log2StartDate.setDate(log2StartDate.getDate() + 2),
		"notes": "ten percent!"
	},
	// deadlift
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 2,
		"sets": 3,
		"strain": 150,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 140,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 4,
		"sets": 3,
		"strain": 130,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 5,
		"sets": 3,
		"strain": 100,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 170,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 150,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 4,
		"sets": 3,
		"strain": 130,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 5,
		"sets": 3,
		"strain": 100,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 180,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 160,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 4,
		"sets": 3,
		"strain": 140,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 5,
		"sets": 3,
		"strain": 120,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 2,
		"sets": 3,
		"strain": 190,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 2,
		"sets": 3,
		"strain": 160,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 140,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 6,
		"sets": 3,
		"strain": 120,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 1,
		"sets": 3,
		"strain": 195,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 2,
		"sets": 3,
		"strain": 160,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 140,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 6,
		"sets": 3,
		"strain": 120,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 2,
		"sets": 3,
		"strain": 195,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 2,
		"sets": 3,
		"strain": 170,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 150,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 6,
		"sets": 3,
		"strain": 130,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 1,
		"sets": 3,
		"strain": 203,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 2,
		"sets": 3,
		"strain": 130,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 120,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 6,
		"sets": 3,
		"strain": 110,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 150,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 6,
		"sets": 3,
		"strain": 130,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 1,
		"sets": 3,
		"strain": 203,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 2,
		"sets": 3,
		"strain": 130,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 120,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 6,
		"sets": 3,
		"strain": 110,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 1,
		"sets": 3,
		"strain": 203,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 2,
		"sets": 3,
		"strain": 130,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 120,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 6,
		"sets": 3,
		"strain": 110,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 2,
		"sets": 3,
		"strain": 130,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 2),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 3,
		"sets": 3,
		"strain": 120,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
	{
		"user": "demo@debloat.us",
		"movement": "Deadlift",
		"reps": 6,
		"sets": 3,
		"strain": 110,
		"unit": "kgs",
		"duration": 15,
		"date": log1StartDate.setDate(log1StartDate.getDate() + 1),
		"notes": "building volume"
	},
]

module.exports = {demoUserLogs, demoUserGoals}
