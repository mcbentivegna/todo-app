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
  
  findTaskByPriority = (prevState, priority) => {
    const priorityTasks =  prevState.taskData.filter(obj => obj.priority === priority);
     if (priorityTasks.length > 1) {
       throw new Error('Two items have the same priority')
     }
     else {
       return priorityTasks[0]
     }

  } 

  updateTaskText = (index, newText) =>{
    this.setState ( prevState => {
      const taskArrayIndex = this.findTaskIndex(prevState, index)
      let newTaskData = prevState.taskData
      newTaskData[taskArrayIndex].text = newText

      return {
        taskData: newTaskData
      }
    })
  }

  changeTaskPriority = (index, change) => {
    this.setState ( prevState => {
      const taskArrayIndex = this.findTaskIndex(prevState, index)
      let newTaskData = prevState.taskData

      //find task in prev state whose slot you want to take.
      const swapTask = this.findTaskByPriority(prevState, newTaskData[taskArrayIndex].priority+change)
      const swapTaskArrayIndex = this.findTaskIndex(prevState,swapTask.index)

      newTaskData[swapTaskArrayIndex].priority = prevState.taskData[taskArrayIndex].priority
      newTaskData[taskArrayIndex].priority = prevState.taskData[taskArrayIndex].priority + change
      
      return {
        taskData: newTaskData
      }
    })
  }

  changeTaskStatus = (index, newState) => {
    this.setState ( prevState => {
      const taskArrayIndex = this.findTaskIndex(prevState, index)
      let newTaskData = prevState.taskData
      newTaskData[taskArrayIndex].status = newState

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

  prioritySortTaskData = (taskData) =>{
    const sortedTaskData = [...taskData]
    sortedTaskData.sort((a,b) => a.priority - b.priority)
    return sortedTaskData
  }

   render () {
    console.log('task data')
    console.log(taskData)
    return (
      <div className='App'>
        <Header />
        {//sort task data in priority order before rendering.
         this.prioritySortTaskData(this.state.taskData).map((task) => {
          return (
            <Task
              text = {task.text}
              key = {task.index}
              status = {task.status}
              index = {task.index}
              changeTaskStatus = {this.changeTaskStatus}
              changeTaskPriority = {this.changeTaskPriority}
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
