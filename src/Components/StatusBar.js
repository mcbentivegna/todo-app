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
  const { classes, addTask, status, index, changeTaskStatus } = props

  if (!addTask) {
    return (
      <div className = {classes.root}>
        <Chip
          onClick= {() => changeTaskStatus(index, 'done')}
          className={ status === 'done' ? `${classes.notSelected} ${classes.done} done` : `${classes.notSelected}` }
          size="small"
          label="Done"
        />
        <Chip
          onClick= {() => changeTaskStatus(index, 'inProgress')}
          className={ status === 'inProgress' ? `${classes.notSelected} ${classes.inProgress}` : `${classes.notSelected}` }
          size="small"
          label="In Progress"
        />
        <Chip
          onClick= {() => changeTaskStatus(index, 'new')}
          className={ status === 'new' ? `${classes.notSelected} ${classes.new}` : `${classes.notSelected}`}
          size="small"
          label="New"
        />
      </div>
    )
  } else {
    return (null)
  }
}

StatusBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  addTask: PropTypes.bool,
  status: PropTypes.string,
  index: PropTypes.number
}

export default withStyles(styles)(StatusBar)
