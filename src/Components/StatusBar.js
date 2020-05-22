import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const styles = {
  root: {
    float: 'right',
    position: 'absolute',
    bottom: '5px',
    right: '5px'
  },
  notSelected: {
    borderRadius: 3,
    'margin-left': '5px',
    background: 'DarkGray',
    color: 'white',
    'font-weight': 'bold'
  },
  new: {
    background: 'YellowGreen'
  },
  inProgress: {
    background: 'Gold'
  },
  done: {
    background: 'LightCoral'
  }
}

const StatusBar = (props) => {
  const { classes, addTask, status, changeTaskStatus } = props

  const handleChangeStatus = (e) => {
    e.preventDefault()
    changeTaskStatus(this.input.value)
    e.currentTarget.reset()
  }

  if (!addTask) {
    return (
      <div className = {classes.root}>
        <Chip
          className={ status === 'done' ? `${classes.notSelected} ${classes.done}` : `${classes.notSelected}` }
          size="small"
          label="Done"
        />
        <Chip className={ status === 'inProgress' ? `${classes.notSelected} ${classes.inProgress}` : `${classes.notSelected}` } size="small" label="In Progress" />
        <Chip className={ status === 'new' ? `${classes.notSelected} ${classes.new}` : `${classes.notSelected}`} size="small" label="New" />
      </div>
    )
  } else {
    return (null)
  }
}

export default withStyles(styles)(StatusBar)
