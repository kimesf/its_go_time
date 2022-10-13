import { Container } from "./sharedstyles"
import { Timer } from "../utils/GoCookiesDatabase"
import { useState, useEffect } from 'react'
import styled from "styled-components"
import { Categories } from "../utils/GoCookiesDatabase"

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

const useForceUpdate = () => {
  const [, setValue] = useState(0)

  return () => { setValue(old => old + 1) }
}

const Timer = ({ tasks }: { tasks: Task[] }) => {
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Container>
      {tasks.map(({ name, timers, start }) => {
        return (
          <StyledTask key={name}>
            <header>
              <h1>{name}</h1>
              <p>Start: {start.toString()}</p>
            </header>
            {Object.entries(groupBy(timers, 'category')).map(([category, timers]) => {
              return (
                <StyledTimer>
                  <Clock category={category} start={start} />
                  <TimerBody>
                    <Tags>
                      {timers.map(({ name, qty }) => {
                        return (
                          <Tag>{name + ' x' + qty}</Tag>
                        )
                      })}
                    </Tags>
                    <div>{Categories[category].toString()}</div>
                  </TimerBody>
                </StyledTimer>
              )
            })}
          </StyledTask>
        )
      })}
    </Container>
  )
}

const Clock = ({ category, start }: { category: string, start: number }) => {
  const formattedTime = () => {
    const totalInSec = Categories[category].reduce((acc, current) => acc + current, 0)
    const diffInSec = Math.floor((Date.now() - start) / 1000)
    const leftInSec = totalInSec - diffInSec
    const minLeft = Math.floor(leftInSec / 60)
    const secLeft = leftInSec % 60

    return `${padTime(minLeft)}:${padTime(secLeft)}`
  }

  const padTime = (number: number) => number.toString().padStart(2, '0')

  return (
    <StyledClock>{formattedTime()}</StyledClock>
  )
}

const StyledClock = styled.div`
  font-size: 4rem;
`

const StyledTask = styled.div`
  background-color: yellow;
  margin-top: 12px;
  padding: 8px;
`

const StyledTimer = styled.div`
  margin-top: 4px;
  background-color: lightgray;
  padding: 8px;
  display: flex;
`

const TimerBody = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.div`
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 4px;
  border: 1px solid black;
`

export default Timer
export { type Task }