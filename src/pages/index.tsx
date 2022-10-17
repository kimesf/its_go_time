import styled from 'styled-components'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import TaskBuilder from '../components/TaskBuilder'
import Tasks, { Task } from '../components/Tasks'
import { Timer } from '../utils/types'

// TODO: create useStateWithLocalStorage
const useLocalStorage = <StoredType,>(id: string, defaultValue: StoredType):
  [() => StoredType, (value: StoredType) => void] => {
  const get = (): StoredType => {
    const item = localStorage.getItem(id)

    return JSON.parse(item as string) || defaultValue
  }

  const set = (value: StoredType): void => {
    localStorage.setItem(id, JSON.stringify(value))
  }

  return [get, set];
}

const App: NextPage = () => {
  const [getStoredTasks, setStoredTasks] = useLocalStorage<Task[]>('tasks', [])

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    setTasks(getStoredTasks())
  }, [])

  const addTask = (newTaskTimers: Timer[]) => {
    setTasks((oldValue) => {
      const newValue = structuredClone(oldValue)

      const newTask = {
        timers: newTaskTimers,
        start: Date.now(),
      }

      newValue.push(newTask)

      setStoredTasks(newValue)

      return newValue
    })
  }

  return (
    <AppWrapper>
      <TaskBuilder
        handleSubmit={addTask}
        title='Its Go Time'
      />
      <Tasks tasks={tasks} />
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  width: 80vw;
  margin: 16px auto;
  `

export default App
