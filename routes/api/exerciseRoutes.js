const router = require('express').Router();
const db = require('../../models');

// Async function that is used in the following get routes
async function getWorkouts(req, res) {
    try {
        const workoutData = await db.Workout.find({})
        const last7 = await workoutData.slice(Math.max(workoutData.length - 7, 0))
        // Total Duration algorithm
            last7.forEach((block) => {
                const arrDuration = [];
                if (block.exercises[0] !== undefined) {
                    block.exercises.forEach((exercise) => {
                        arrDuration.push(exercise.duration)
                    })
                    block.totalDuration = arrDuration.reduce((x, y) => x + y);
                }
            })
        res.status(200).json(last7)
    } catch (err) {
        res.status(400).json(err)
    }
}

// Routes to get workouts
router.get('/', getWorkouts)
router.get('/range', getWorkouts)

// Route to create workouts
router.post('/', async (req, res) => {
    try {
        const newWorkout = await db.Workout.create(req.body)
        res.status(200).json(newWorkout)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Route to create exercises
router.put('/:id', async (req, res) => {
    try{
        const addExercise = await db.Workout.findByIdAndUpdate(req.params.id,
            {
                $push: { 
                    exercises: req.body 
                }
            },
        );
        res.status(200).json(addExercise)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

module.exports = router;