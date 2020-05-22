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

  changeTaskStatus = (index, newState) => {

    const arrayIndex= taskData.findIndex(obj => obj.index == index);
    let newTaskData = taskData[arrayIndex].state = newState

    this.setState ( prevState => {
      return {
        taskData: newTaskData
      }
    })
  }

  render () {
    const arrayIndex = taskData.findIndex(obj => obj.index == 3)
    console.log(arrayIndex)
    console.log(taskData[arrayIndex])
    // This won't be defined the first time things load, so you get odd behavior...
    //taskData[arrayIndex].index = 45
    //console.log(taskData[arrayIndex].index)
    return (
      <div className='App'>
        <Header />
        {this.state.taskData.map((task) => {
          return (
            <Task
              text = {task.text}
              key = {task.index}
              status = {task.status}
              changeTaskStatus = {this.changeTaskStatus}
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
