import type { NextPage } from 'next'

import { useState } from 'react'
import { Timer } from '../utils/GoCookiesDatabase'
import styled from 'styled-components'
import TaskBuilder from '../components/TaskBuilder'

interface Task {
  name: string,
  timers: Timer[],
}

const App: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (newTaskTimers: Timer[]) => {
    setTasks((oldValue) => {
      const newValue = structuredClone(oldValue)

      const newTask = {
        name: 'Default name',
        timers: newTaskTimers,
      }

      newValue.push(newTask)

      return newValue
    })
  }

  return (
    <AppWrapper>
      <TaskBuilder handleSubmit={addTask} />
    </AppWrapper>
  )
}


const AppWrapper = styled.div`
  width: 80vw;
  margin: auto;
  background-color: blue;
`

export default App
