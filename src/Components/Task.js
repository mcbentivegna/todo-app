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
  }
}

const Task = (props) => {
  const { classes, text, status, addTask, handleSubmit, changeTaskStatus } = props
  return (
    <div>
      <Container
        className={ classes.root }
        maxWidth= 'sm'
      >
        {text}
        <AddTaskForm addTask={addTask} handleSubmit = {handleSubmit}></AddTaskForm>
        <StatusBar addTask ={addTask} status= {status} changeTaskStatus = {changeTaskStatus} />
      </Container>
      <p></p>
    </div>
  )
}

Task.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  addTask: PropTypes.bool,
  handleSubmit: PropTypes.func
}

export default withStyles(styles)(Task)
