import styled from "styled-components"
import ClockTimeLine from "./ClockTimeLine"
import { Timer, TimerCategory } from "../utils/types"
import { useState } from "react"

const Subtask = ({ category, timers, startInMs }:
  {
    category: keyof typeof TimerCategory,
    timers: Timer[],
    startInMs: number
  }) => {
  const [alarmSound,] = useState(new Audio('/alarmSound.mp3'))
  const [isWarning, setIsWarning] = useState<boolean>(false)
  const [alarmMessage, setAlarmMessage] = useState<string>('no message set')

  const setAlarm = (message: string) => {
    setIsWarning(true)
    setAlarmMessage(message)
    alarmSound.play()
  }

  const clearWarning = () => {
    setIsWarning(false)
    setAlarmMessage('')
    alarmSound.pause()
  }

  return (
    <StyledSubtask>
      {isWarning && <Warning onClick={clearWarning}>
        <h1>{alarmMessage}</h1>
      </Warning>}
      <ClockTimeLine
        timerCategory={category}
        startInMs={startInMs}
        alarmHandler={setAlarm}
      />
      <Tags>
        {timers.map(({ name, qty }) => {
          return (
            <Tag key={name}>{name + ' x' + qty}</Tag>
          )
        })}
      </Tags>
    </StyledSubtask>
  )
}

const StyledSubtask = styled.div`
  margin-top: 4px;
  background-color: lightgray;
  padding: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Warning = styled.div`
  position: absolute;
  top: 50%;
  left: -92px;
  text-transform: uppercase;
  font-weight: bold;
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

export default Subtask