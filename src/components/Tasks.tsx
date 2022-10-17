import { Container } from "./sharedstyles"
import { AvailableTimerCategories, Task, Timer, TimerCategory } from '../utils/types'
import styled from "styled-components"
import Subtask from "./Subtask"
import { timersGroupedByCategory } from "../utils/helpers"

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  const startedAt = (ms: number) => new Date(ms).toLocaleString('pt-BR')

  const timersByCategory = (timers: Timer[]) => {
    const grouped = timersGroupedByCategory(timers)

    return Object.entries(grouped)
  }

  const orderedTasks = structuredClone(tasks).reverse()

  return (
    <Container>
      {orderedTasks.map(({ timers, start }) => {
        return (
          <StyledTask key={start}>
            <TaskName>{startedAt(start)}</TaskName>
            {timersByCategory(timers).map(([category, timersGrouped]) => {
              return (
                <Subtask
                  key={category}
                  category={(category as AvailableTimerCategories)}
                  timers={timersGrouped}
                  startInMs={start}
                />
              )
            })}
          </StyledTask>
        )
      })}
    </Container>
  )
}

const StyledTask = styled.div`
  margin-top: 12px;
  padding: 8px;
  box-shadow: 5px 2px 20px lightgrey;
  /* TODO #4 move to css var */
  border-top: 5px solid #f07066;
`

const TaskName = styled.div`
  margin: 4px 0 4px;
  font-size: 1.2rem;
`

export default Tasks
export { type Task }