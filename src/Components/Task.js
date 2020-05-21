import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import AddTaskForm from './AddTaskForm'

const styles = {
  root: {
    background: '#dcd6f7',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #a6b1e1',
    color: '#424874',
    height: 48,
    padding: '0 30px'
  }
}

const Task = (props) => {
  const { classes, text, addTask, handleSubmit } = props
  return (
    <Container
      className={ classes.root }
      maxWidth= 'sm'
    >
      <p>{text}</p>
      <AddTaskForm addTask={addTask} handleSubmit = {handleSubmit}></AddTaskForm>
    </Container>
  )
}

Task.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  addTask: PropTypes.bool,
  handleSubmit: PropTypes.func
}

export default withStyles(styles)(Task)
