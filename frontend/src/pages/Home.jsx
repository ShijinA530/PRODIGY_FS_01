import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutContext } from "../hooks/useWorkoutContext"


const Home = () => {
  const {workouts, dispatch} = useWorkoutContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('https://workout-buddy-y3vh.onrender.com/api/workouts')
        const json = await response.json()

        dispatch({type: 'SET_WORKOUTS', payload: json})        
      
      } catch(err) {
        console.log({error: err.message});
      }
    }

    fetchWorkouts()
  },[])

  return (
    <div className='home'>
      <div className="workouts">
        {workouts?.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout}/>
          ))}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home
