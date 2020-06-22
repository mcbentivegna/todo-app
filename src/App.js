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
          newTask(prevState.taskData, text)
        ]
      }
    })
  }

  
  findTaskIndex = (prevState, index) => {
    return prevState.taskData.findIndex(obj => obj.index === index);

  } 

  updateTaskText = (index, newText) =>{
    this.setState ( prevState => {
      const arrayIndex = this.findTaskIndex(prevState, index)
      let newTaskData = prevState.taskData
      newTaskData[arrayIndex].text = newText

      return {
        taskData: newTaskData
      }
    })
  }



  changeTaskStatus = (index, newState) => {
    this.setState ( prevState => {
      const arrayIndex = this.findTaskIndex(prevState, index)
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
      newTaskData = newTaskData.filter( (task) => task.index !== index )
    return {
        taskData: newTaskData
      }
    })
  }

  render () {
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
              newTask = {false}
              updateTaskText = {this.updateTaskText}
            />)
        })}
        <Task
          key = {'add-task'}
          newTask = {true}
          handleSubmit = {this.handleSubmit}
           />
      </div>
    )
  }
}

export default App
