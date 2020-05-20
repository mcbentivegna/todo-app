import React from 'react'
import './App.css'
import Header from './Components/Header'
import Task from './Components/Tasks'
import { taskData, addTask } from './taskData'

function App () {
  console.log(taskData)
  return (
    <div className='App'>
      <Header />
      {taskData.map((task) => {
        return (
          <Task
            maxWidth = 'sm'
            text = {task.text}
            key = {task.index}
          />)
      })}
    </div>
  )
}

export default App
