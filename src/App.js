import React from 'react'
import './App.css'
import Header from './Components/Header'
import Task from './Components/Task'
import { taskData, newTask } from './taskData'

class App extends React.Component {

  state = {
    taskData: taskData
  };


  handleSubmit = (text) => {
    this.setState( prevState => {
      return {
        taskData: [
          ...prevState.taskData,
          newTask(text)
        ]
      }
    })
  }

  render () {
    console.log(this.state)
    return (
      <div className='App'>
        <Header />
        {this.state.taskData.map((task) => {
          return (
            <Task
              text = {task.text}
              key = {task.index}
            />)
        })}
        <Task
          key = {'add-task'}
          addTask = {true}
          handleSubmit = {this.handleSubmit}
           />
      </div>
    )
  }
}

export default App
