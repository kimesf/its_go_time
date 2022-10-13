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
  return (
    <Container>
      {tasks.map(({ name, timers, start }) => {
        return (
          <StyledTask key={name}>
            <header>
              <h1>{name}</h1>
              <DateReadable ms={start} />
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

const DateReadable = ({ ms }: { ms: number }) => {
  const formattedTime = () => {
    const date = new Date(ms)
    const day = date.getDate()
    const month = date.getMonth()
    const hour = date.getHours()
    const min = date.getMinutes()

    return `${padTime(day)}/${padTime(month)} ${padTime(hour)}:${padTime(min)}`
  }

  // TODO #2: remove duplication
  const padTime = (number: number) => number.toString().padStart(2, '0')

  return (
    <div>{formattedTime()}</div>
  )
}

const StyledTask = styled.div`
  background-color: yellow;
  margin-top: 12px;
  padding: 8px;
`

export default Tasks
export { type Task }