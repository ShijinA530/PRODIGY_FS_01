import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from './../hooks/useAuthContext';


const Home = () => {
  const {workouts, dispatch} = useWorkoutContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        
        dispatch({type: 'SET_WORKOUTS', payload: json})        
      
      } catch(err) {
        console.log({error: err.message});
      }
    }

    if (user) {
      fetchWorkouts()
    }
    },[dispatch, user])

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
