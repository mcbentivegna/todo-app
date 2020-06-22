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
    const { classes, editing, handleSubmit, text, updateTaskText, index, toggleState } = this.props

    const onSubmit = (e) => {
      e.preventDefault()
      if (text) {
        updateTaskText(index, this.input.value)
        toggleState()
      } else {
        handleSubmit(this.input.value)
      }
      e.currentTarget.reset()
    }

    if (editing) {
      return (
        <form
          className={ classes.root }
          onSubmit = {onSubmit}>
          <TextField
            id = "add-task-form"
            label = "Add Task"
            defaultValue = { text }
            inputRef={ ref => this.input = ref }
            inputProps = { { maxLength: '140' } }
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
  text: PropTypes.string,
  index: PropTypes.number,
  toggleState: PropTypes.func
}

export default withStyles(styles)(AddTaskForm)
