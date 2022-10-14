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

  return (
    <Container>
      {tasks.map(({ name, timers, start }) => {
        return (
          <StyledTask key={name}>
            <header>
              <h1>{name}</h1>
              <div>{startedAt(start)}</div>
            </header>
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
  background-color: yellow;
  margin-top: 12px;
  padding: 8px;
`

export default Tasks
export { type Task }