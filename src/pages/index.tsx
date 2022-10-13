import type { NextPage } from 'next'

import { useState } from 'react'
import styled from 'styled-components'
import TaskBuilder from '../components/TaskBuilder'
import Timer from '../components/Tasks'
import { Task } from '../components/Tasks'

const App: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (newTaskTimers: Timer[]) => {
    setTasks((oldValue) => {
      const newValue = structuredClone(oldValue)

      const newTask = {
        name: 'Default name',
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
      <Timer tasks={tasks} />
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  width: 80vw;
  margin: auto;
  background-color: blue;
`

export default App
