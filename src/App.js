import React from 'react'
import './App.css'
import Header from './Components/Header'
import Task from './Components/Task'
import Slot from './Components/Slot'
import { taskData, newTask } from './taskData'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


class App extends React.Component {

  state = {
    taskData: taskData,
    isAnythingDragging: false
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
      //establish basic info about the task you want to move
      const taskArrayIndex = this.findTaskIndex(prevState, index)
      const taskPriority = prevState.taskData[taskArrayIndex].priority
      console.log('change '+ change)
      console.log('old priority ' + prevState.taskData[taskArrayIndex].priority)
      console.log('new priority ' + (prevState.taskData[taskArrayIndex].priority + change))

      //create clone of prevState,which will be used to assign new state.
      let newTaskData = prevState.taskData

      //find tasks with priorities in range of change.
      const swapTasks = prevState.taskData.filter( t => {
        let swapBoolean
        change<0 
        ? swapBoolean = (t.priority >= (taskPriority + change) && t.priority< taskPriority) 
        : swapBoolean = (t.priority <= (taskPriority + change) && t.priority> taskPriority)
        return swapBoolean
      })
      //Move tasks up or down in priority
      swapTasks.map( (t) => {
        newTaskData[this.findTaskIndex(prevState, t.index)].priority = t.priority + (change<0 ? + 1 : -1)
      })
      
      //assign moved task to its new priority
      newTaskData[taskArrayIndex].priority = prevState.taskData[taskArrayIndex].priority + change
      
      return {
        taskData: newTaskData
      }
    })
  }
  

  toggleisAnythingDragging = (index) => {

    this.setState ( prevState => {
      return {
        isAnythingDragging: index
      }
    })

    /*this.setState ( prevState =>{
        let newState = !prevState.isAnythingDragging
      return {
        isAnythingDragging: newState
      }
    })*/
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
    return (
      <DndProvider backend={HTML5Backend}>
      <div className='App'>
        <Header />
        {this.state.isAnythingDragging>1 ? <Slot index = {1} key = {1} changeTaskPriority = {this.changeTaskPriority}></Slot> : null}
        {//sort task data in priority order before rendering.
         this.prioritySortTaskData(this.state.taskData).map((task) => {
          return (
            <div>
            <Task
              text = {task.text}
              key = {task.index}
              status = {task.status}
              index = {task.index}
              priority = {task.priority}
              changeTaskStatus = {this.changeTaskStatus}
              changeTaskPriority = {this.changeTaskPriority}
              deleteTask = {this.deleteTask}
              newTask = {false}
              updateTaskText = {this.updateTaskText}
              toggleisAnythingDragging = {this.toggleisAnythingDragging}
            />
            {this.state.isAnythingDragging>0 && task.index != this.state.isAnythingDragging && task.index != this.state.isAnythingDragging -1 
            ? <Slot 
                key = {task.priority < this.state.isAnythingDragging ? task.priority + 1 : task.priority -1} 
                index = {task.priority < this.state.isAnythingDragging ? task.priority + 1 : task.priority -1} 
                changeTaskPriority = {this.changeTaskPriority}>
              </Slot> 
            : null}
            </div>
            )
            
        })}
        <Task
          key = {'add-task'}
          newTask = {true}
          handleSubmit = {this.handleSubmit}
           />
      </div>
      </DndProvider>
    )
  }
}

export default App
