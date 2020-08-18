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
    const { classes, 
            editing, 
            error,
            toggleError,
            handleSubmit, 
            text, 
            updateTaskText, 
            index, 
            toggleEditing } = this.props

    const onSubmit = (e) => {
      e.preventDefault()
      if (text) {
        updateTaskText(index, this.input.value)
        toggleEditing()
      } else {
          handleSubmit(this.input.value)
      }
      e.currentTarget.reset()
    }

    const onChange = (e) => {
      if (this.input.value.length >= 140){
        toggleError()
      }
    }

    if (editing) {
      return (
        <form
          className={ classes.root }
          onSubmit = { onSubmit }
          onChange = { onChange }>
          <TextField
            id = "add-task-form"
            label = "Add Task"
            defaultValue = { text }
            inputRef={ ref => this.input = ref }
            inputProps = { { maxLength: '140' } }
            error = { error }
            helperText = { error ? 'Tasks are limited to 140 characters': ''}
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
  updateTaskText: PropTypes.func,
  editing: PropTypes.bool,
  toggleEditing: PropTypes.func,
  error: PropTypes.bool,
  toggleError: PropTypes.func,
  text: PropTypes.string,
  index: PropTypes.number  
}

export default withStyles(styles)(AddTaskForm)
