const taskData = [
  {
    text: 'Pick up 1 gallon milk.',
    priority: 1,
    status: 'new',
    index: 100
  },
  {
    text: 'Schedule dentist appointments for next month.',
    priority: 2,
    status: 'inProgress',
    index: 200
  },
  {
    text: 'Call Aunt Hilda.',
    priority: 3,
    status: 'new',
    index: 300
  },
  {
    text: 'Fix broken cabinet.',
    priority: 4,
    status: 'done',
    index: 400
  },
  {
    text: 'Follow up with electrician.',
    priority: 5,
    status: 'done',
    index: 500
  },
  {
    text: 'Return library books.',
    priority: 6,
    status: 'new',
    index: 600
  },
  {
    text: 'Install shelves.',
    priority: 7,
    status: 'new',
    index: 700
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
