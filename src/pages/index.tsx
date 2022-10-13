import styled from 'styled-components'
import type { NextPage } from 'next'
import { useState } from 'react'

import TaskBuilder from '../components/TaskBuilder'
import Tasks, { Task } from '../components/Tasks'
import { Timer } from '../utils/types'

const App: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (newTaskTimers: Timer[]) => {
    setTasks((oldValue) => {
      const newValue = structuredClone(oldValue)

      const newTask = {
        name: 'Pedido# ' + Math.random().toString(),
        timers: newTaskTimers,
        start: Date.now(),
      }

      newValue.push(newTask)

      return newValue
    })
  }

  return (
    <AppWrapper>
      <TaskBuilder handleSubmit={addTask} />
      <Tasks tasks={tasks} />
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  width: 80vw;
  margin: auto;
  background-color: blue;
`

export default App
