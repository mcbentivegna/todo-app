import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Close, Edit, ArrowUpward, ArrowDownward } from '@material-ui/icons'
import { DragSource } from 'react-dnd'
import Tooltip from '@material-ui/core/Tooltip'
import AddTaskForm from './AddTaskForm'
import StatusBar from './StatusBar'

const styles = {
  root: {
    background: '#dcd6f7',
    border: 0,
    borderRadius: 3,
    //boxShadow: '0 3px 5px 2px #a6b1e1',
    color: '#424874',
    height: 72,
    padding: '0 30px',
    'text-align': 'left',
    position: 'relative'
  },
  spacing: {
    height:'5px'
  },
  close: {
    position: 'absolute',
    right: '5px',
    top: '5px'
  },
  done: {
    'text-decoration': 'line-through'
  },
  edit: {
    color: '#a6b1e1',
    'padding-inline-start': '10px'
  },
  upArrow: {
    color: '#a6b1e1',
    'padding-inline-start': '10px'
  },
  downArrow: {
    color: '#a6b1e1',
    'padding-inline-start': '10px'
  }
}

const Types = {
  TASK: 'task'
}


const taskSource = {

  canDrag(props, monitor) {
    return !props.newTask
  },

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().index === props.index
    //return monitor.getItem()
  },
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { 
      index: props.index,
      priority: props.priority 
    }
    //workaround for this bug: https://github.com/react-dnd/react-dnd/issues/477
    setTimeout( () => {props.toggleisAnythingDragging(item.index)}, 10)

   return item
  },
  endDrag(props, monitor, component){
    const item = {index: props.index, priority: props.priority}
    props.toggleisAnythingDragging(-1)
  }
}

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  }
}

class Task extends React.Component {

  state = {
    editing: false,
    error: false
  }

  toggleEditing = () => {
    this.setState ( prevState => {
      return {
        editing: !prevState.editing
      }
    })
  }

  toggleError = () => {
    this.setState ( prevState => {
      return {
        error: !prevState.error
      }
    })
  }

  componentWillMount() {
    if (this.props.newTask){
      this.toggleEditing()
    }
  }

  render() {
    const {
      classes,
      text,
      status,
      index,
      priority,
      handleSubmit,
      changeTaskStatus,
      changeTaskPriority,
      updateTaskText,
      newTask,
      deleteTask,
      isDragging,
      beginDrag,
      endDrag,
      connectDragSource,
      toggleIsAnythingDragging
    } = this.props

        
    return connectDragSource(
      <div>  
        <Container
          className={ status === 'done' ? `${classes.root} ${classes.done}` : classes.root }
          maxWidth= 'sm'
        >
          {newTask ? null : <Tooltip title = "Delete Task"><Close className = {classes.close} onClick = {() => deleteTask(index)}/></Tooltip>}
          {this.state.editing ? null : text}
          {this.state.editing ? null : <Tooltip title = "Edit"><Edit className = {classes.edit} onClick = {() => this.toggleEditing()}/></Tooltip> }
          {newTask ? null : <Tooltip title = "Move Task Up"><ArrowUpward className = {classes.upArrow} onClick = {() => changeTaskPriority(index,-2)}/></Tooltip> }
          {newTask ? null : <Tooltip title = "Move Task Down"><ArrowDownward className = {classes.downArrow} onClick = {() => changeTaskPriority(index,1)}/></Tooltip> }
          <AddTaskForm 
            editing={this.state.editing} 
            toggleEditing = {this.toggleEditing}
            error={this.state.error}
            toggleError={this.toggleError}
            handleSubmit = {handleSubmit}
            updateTaskText = {updateTaskText}
            index = {index}
            text = {text}></AddTaskForm>
          <StatusBar editing= {this.state.editing} status= {status} index = {index} changeTaskStatus = {changeTaskStatus} />
        </Container>
        <div className = {`${classes.spacing}`}></div>
      </div>
    )
  }
}

Task.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  addTask: PropTypes.bool,
  status: PropTypes.string,
  handleSubmit: PropTypes.func,
  index: PropTypes.number,
  priority: PropTypes.number,
  changeTaskStatus: PropTypes.func,
  changeTaskPriority: PropTypes.func,
  updateTaskText: PropTypes.func,
  deleteTask: PropTypes.func,
  toggleIsAnythingDragging: PropTypes.func
}

//export default withStyles(styles)(Task)
//this explains how to export with multiple higher level components
export default  (DragSource(Types.TASK, taskSource, collect)(withStyles(styles)(Task)))

