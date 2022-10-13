import { Container } from "./sharedstyles"
import { Timer } from "../utils/GoCookiesDatabase"
import styled from "styled-components"
import Subtask from "./Subtask"

interface Task {
  name: string,
  timers: Timer[],
  start: number,
}

// TODO #1: remove dup
const groupBy = (collection: any[], key: string) => {
  return collection.reduce((result, current) => {
    const group = current[key]
    result[group] ||= []
    result[group].push(current)
    return result
  }, {})
}

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  const startedAt = (ms: number) => new Date(ms).toLocaleString('pt-BR')

  return (
    <Container>
      {tasks.map(({ name, timers, start }) => {
        return (
          <StyledTask key={name}>
            <header>
              <h1>{name}</h1>
              <div>{startedAt(start)}</div>
            </header>
            {Object.entries(groupBy(timers, 'category')).map(([category, timers]) => {
              return (
                <Subtask key={category} category={category} timers={timers} startInMs={start} />
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