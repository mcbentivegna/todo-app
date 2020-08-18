import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Close, Edit } from '@material-ui/icons'
import Tooltip from '@material-ui/core/Tooltip'
import AddTaskForm from './AddTaskForm'
import StatusBar from './StatusBar'

const styles = {
  root: {
    background: '#dcd6f7',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #a6b1e1',
    color: '#424874',
    height: 72,
    padding: '0 30px',
    'text-align': 'left',
    position: 'relative'
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
      console.log('test error' + ' ' + prevState.error)
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
      handleSubmit,
      changeTaskStatus,
      updateTaskText,
      newTask,
      deleteTask
    } = this.props

    return (
      <div>
        <Container
          className={ status === 'done' ? `${classes.root} ${classes.done}` : classes.root }
          maxWidth= 'sm'
        >
          {newTask ? null : <Tooltip title = "Delete Task"><Close className = {classes.close} onClick = {() => deleteTask(index)}/></Tooltip>}
          {this.state.editing ? null : text}
          {this.state.editing ? null : <Tooltip title = "Edit"><Edit className = {classes.edit} onClick = {() => this.toggleEditing()}/></Tooltip> }
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
        <p></p>
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
  changeTaskStatus: PropTypes.func,
  updateTaskText: PropTypes.func,
  deleteTask: PropTypes.func
}

export default withStyles(styles)(Task)
