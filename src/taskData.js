import array from 'lodash/array'

let taskData = [
  {
    text:'Pick up 1 gallon milk.',
    priority: 1,
    status: 'new',
    index: 1
  },
  {
    text: 'Schedule dentist appointments for next month.',
    priority: 2,
    status: 'in progress',
    index: 2
  },
  {
    text: 'Call Aunt Hilda.',
    priority: 3,
    status: 'new',
    index: 3
  },
  {
    text: 'Fix broken cabinet.',
    priority: 4,
    status: 'done',
    index: 4
  }
]

const minPriority = () => taskData.length - 1
const maxId = () => taskData.reduce((acc, cur) => Math.max(acc, cur.index), 0)

const addTask = (text) => {
  const task = {
    text,
    priority: minPriority() + 1,
    status: 'new',
    index: maxId() + 1
  }
  taskData.push(task)
}

export { taskData, addTask, maxId }
