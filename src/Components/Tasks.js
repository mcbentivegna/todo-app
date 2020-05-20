import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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
  const { classes, maxWidth, text, key } = props

  return (
    <Container
      className={ classes.root }
      maxWidth= { maxWidth }
      key = { key }>
      <p>{text}</p>
    </Container>
  )
}

Task.propTypes = {
  classes: PropTypes.object.isRequired,
  maxWidth: PropTypes.string,
  text: PropTypes.string,
  key: PropTypes.number
}

export default withStyles(styles)(Task)
