import React from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const styles = {
  root: {
    background: '#ddd9f0',
    border: 0,
    borderRadius: 3,
    height: '8px',
    padding: '0 30px',
    'text-align': 'left',
    position: 'relative'
  },
  isOver: {
    background: '#424874',
    border: 0,
    borderRadius: 3,
    height: '8px',
    padding: '0 30px',
    'text-align': 'left',
    position: 'relative'
  },
  spacing :{
    height: '5px'
  }
}

const Types = {
  TASK: 'task'
}

  //trying to use this to solve my some tasks don't drag problem: https://github.com/react-dnd/react-dnd/issues/766
 //not sure if using canDrop will help, though, since I don't really need this function in the first place. 
const MIN_MOVEMENT = 15
const vectorMagnitude = (x, y) => Math.sqrt(x ** 2 + y ** 2)
const isMinimallyMoved = ({ x, y }) => vectorMagnitude(x, y) > MIN_MOVEMENT

const slotTarget = {
  drop (props, monitor, component) {
    const item = monitor.getItem()
    console.log('index of slot ' + props.index)
    props.changeTaskPriority(item.index, props.index - item.priority, props.index)
  },
  canDrop (props, monitor) {
    const minimallyMoved = isMinimallyMoved((monitor.getDifferenceFromInitialOffset()))
    return minimallyMoved
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class Slot extends React.Component {
  render () {
    const { classes, connectDropTarget, isOver, index, changeTaskPriority, key } = this.props

    return connectDropTarget(
      <div>
        <Container
          className = {isOver ? `${classes.isOver}`:`${classes.root}`}
          maxWidth = 'sm'>
        </Container>
        <div
          className = {`${classes.spacing}`}></div>
      </div>
    )
  }
}

Slot.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number,
  changeTaskPriority: PropTypes.func

}

export default (DropTarget(Types.TASK, slotTarget, collect)(withStyles(styles)(Slot)))
