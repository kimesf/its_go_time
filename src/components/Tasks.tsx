import { Container } from "./sharedstyles"
import { AvailableTimerCategories, Task, Timer, TimerCategory } from '../utils/types'
import styled from "styled-components"
import Subtask from "./Subtask"
import { timersGroupedByCategory } from "../utils/helpers"
import { useState } from "react"
import build from "next/dist/build"

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  const orderedTasks = (): Task[] => JSON.parse(JSON.stringify(tasks)).reverse()

  return (
    <Container>
      {orderedTasks().map(({ timers, start }) => {
        return (
          <TaskView key={start} start={start} timers={timers}></TaskView>
        )
      })}
    </Container>
  )
}

const TaskView = ({ start, timers }: { start: number, timers: Timer[] }) => {
  const groupedTimers = Object.entries(timersGroupedByCategory(timers))
  const [subtasksAreDone, setSubtasksAreDone] = useState(groupedTimers.map(() => false))

  const buildSetSubtaskDoneFn = (subtaskIndex: number): () => void => {
    return () => {
      setSubtasksAreDone((oldValue) => {
        const newValue = structuredClone(oldValue)

        newValue[subtaskIndex] = true

        return newValue
      })
    }
  }

  const startedAt = (ms: number) => new Date(ms).toLocaleString('pt-BR')

  return (
    <StyledTask isDone={subtasksAreDone.every((isDone) => isDone)}>
      <TaskName>{startedAt(start)}</TaskName>
      {groupedTimers.map(([category, timersGrouped], subtaskIndex) => {
        return (
          <Subtask
            handleDone={buildSetSubtaskDoneFn(subtaskIndex)}
            key={category}
            category={(category as AvailableTimerCategories)}
            timers={timersGrouped}
            startInMs={start}
          />
        )
      })}
    </StyledTask>
  )
}

const StyledTask = styled.div<{ isDone: boolean }>`
  ${props => props.isDone && 'filter: grayscale(1);'};
  margin-top: 12px;
  padding: 8px;
  box-shadow: 5px 2px 20px lightgrey;
  /* TODO move to css var */
  border-top: 5px solid #f07066;
`

const TaskName = styled.div`
  margin: 4px 0 4px;
  font-size: 1.2rem;
`

export default Tasks
export { type Task }