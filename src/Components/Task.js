import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
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
  }
}

const Task = (props) => {
  const { classes, text, status, index, addTask, handleSubmit, changeTaskStatus, deleteTask } = props

  return (
    <div>
      <Container
        className={ classes.root }
        maxWidth= 'sm'
      >
        <div 
          className = {classes.close}
          onClick = {() => deleteTask(index)}>X</div>
        {text}
        <AddTaskForm addTask={addTask} handleSubmit = {handleSubmit}></AddTaskForm>
        <StatusBar addTask ={addTask} status= {status} index = {index} changeTaskStatus = {changeTaskStatus} />
      </Container>
      <p></p>
    </div>
  )
}

Task.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  addTask: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func,
  index: PropTypes.number.isRequired,
  changeTaskStatus: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
}

export default withStyles(styles)(Task)
