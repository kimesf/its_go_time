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
    if (Notification.permission != 'granted') {
      Notification.requestPermission()
    }
  })

  useEffect(() => {
    setTasks(getStoredTasks())
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      if (window.Worker) {
        const worker = new Worker('/taskNotificationSchedulerWorker.js')

        worker.postMessage(newTask)

        worker.onmessage = (e) => {
          const audio = new Audio('/alarmSound.mp3')
          audio.play()
          setTimeout(() => { audio.pause() }, 5000)
        }
      }

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
