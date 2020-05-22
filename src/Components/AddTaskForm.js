import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/'

const styles = () => ({
  root: {
    '& .MuiTextField-root': {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap'
    }
  }
})

class AddTaskForm extends React.Component {
  render () {
    const { classes, addTask, handleSubmit } = this.props

    const onSubmit = (e) => {
      e.preventDefault()
      handleSubmit(this.input.value)
      e.currentTarget.reset()
    }

    if (addTask) {
      return (
        <form
          className={ classes.root }
          onSubmit = {onSubmit}>
          <TextField
            id = "add-task-form"
            label = "Add Task"
            inputRef={ ref => this.input = ref }
          />
        </form>
      )
    } else {
      return (null)
    }
  }
}

AddTaskForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  addTask: PropTypes.bool
}

export default withStyles(styles)(AddTaskForm)
