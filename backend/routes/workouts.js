const express = require('express')
const router = express.Router()
const workoutController = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)  // require auth for all routes
router.get('/', workoutController.getWorkouts)
router.get('/:id', workoutController.getWorkout)
router.post('/', workoutController.createWorkout)
router.delete('/:id', workoutController.deleteWorkout)
router.patch('/:id', workoutController.updatWorkout)
 
module.exports = router