const express = require('express')
const router = express.Router()
const workoutController = require('../controllers/workoutController')


router.get('/', workoutController.getWorkouts)
router.get('/:id', workoutController.getWorkout)
router.post('/', workoutController.createWorkout)
router.delete('/:id', workoutController.deleteWorkout)
router.patch('/:id', workoutController.updatWorkout)
 
module.exports = router