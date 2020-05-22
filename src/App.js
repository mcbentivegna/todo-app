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
    this.setState ( prevState => {
      const arrayIndex= prevState.taskData.findIndex(obj => obj.index == index);
      let newTaskData = prevState.taskData
      newTaskData[arrayIndex].status = newState

      return {
        taskData: newTaskData
      }
    })
  }

  deleteTask = (index) => {  
    this.setState ( prevState => {
      let newTaskData = prevState.taskData
      newTaskData = newTaskData.filter( (task) => task.index != index )
    return {
        taskData: newTaskData
      }
    })
  }

  render () {
    const arrayIndex = taskData.findIndex(obj => obj.index == 3)
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
              index = {task.index}
              changeTaskStatus = {this.changeTaskStatus}
              deleteTask = {this.deleteTask}
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
