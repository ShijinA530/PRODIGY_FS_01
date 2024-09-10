const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// get all workouts
module.exports.getWorkouts = async (req, res) => {
    const userId = req.user._id
    const workouts = await Workout.find({ userId }).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get a single workout
module.exports.getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    try{
        const workout = await Workout.findById(id)
        res.status(200).json(workout)
    } catch(err){
        res.status(400).json({ error: 'No such workout'})
    }
}

// create new workout
module.exports.createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const userId = req.user._id
        const workout = await Workout.create({title, load, reps, userId})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
module.exports.deleteWorkout = async (req, res) => {
    const { id } =req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    try{
        const workout = await Workout.findOneAndDelete({_id: id})
        res.status(200).json(workout)
    } catch(err){
        res.status(400).json({ error: 'No such workout'})
    }
}

// update a workout
module.exports.updatWorkout = async (req, res) => {
    const { id } =req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    try {
        const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})
        res.status(200).json(workout)
    } catch {
        res.status(400).json({error: 'Something error'})
    }
}