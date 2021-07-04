const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
            },
            name: {
                type: String,
                trim: true,
                required: true,
                minLength: 1,
            },
            duration: {
                type: Number,
                min: 1,
            },
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number,
        },
    ],
    totalDuration: {
        type: Number,
        default: 0,
    }
});

const Workout = mongoose.model("Workouts", WorkoutSchema);

module.exports = Workout;