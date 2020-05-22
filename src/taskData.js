const taskData = [
  {
    text: 'Pick up 1 gallon milk.',
    priority: 1,
    status: 'new',
    index: 1
  },
  {
    text: 'Schedule dentist appointments for next month.',
    priority: 2,
    status: 'inProgress',
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
  },
  {
    text: 'Follow up with electrician.',
    priority: 5,
    status: 'done',
    index: 5
  }
]

const minPriority = (taskData) => taskData.length
const maxId = (taskData) => taskData.reduce((acc, cur) => Math.max(acc, cur.index), 0)

const newTask = (taskData, text) => {
  const task = {
    text: text,
    priority: minPriority(taskData) + 1,
    status: 'new',
    index: maxId(taskData) + 1
  }
  return task
}

export { taskData, newTask, maxId }
