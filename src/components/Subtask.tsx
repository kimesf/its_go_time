import styled, { keyframes } from "styled-components"
import ClockTimeLine from "./ClockTimeLine"
import { Timer, TimerCategory } from "../utils/types"
import { useRef, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const Subtask = ({ category, timers, startInMs, handleDone }:
  {
    category: keyof typeof TimerCategory,
    timers: Timer[],
    startInMs: number,
    handleDone: () => void,
  }) => {
  const subtaskRef = useRef<HTMLDivElement | null>(null)
  const [isDone, setIsDone] = useState(false)
  const [alarmSound,] = useState(new Audio('/alarmSound.mp3'))
  const [isWarning, setIsWarning] = useState<boolean>(false)
  const [alarmMessage, setAlarmMessage] = useState<string>('no message set')

  const setDone = () => {
    setIsDone(true)
    handleDone()
  }

  const setAlarm = (message: string) => {
    setIsWarning(true)
    setAlarmMessage(message)
    alarmSound.play()
    subtaskRef.current?.scrollIntoView(false)
  }

  const clearWarning = () => {
    setIsWarning(false)
    setAlarmMessage('')
    alarmSound.pause()
  }

  return (
    <StyledSubtask ref={subtaskRef} isDone={isDone}>
      {isWarning && <WarnBar />}
      {isWarning && <Warning onClick={clearWarning}>
        <span>
          <FontAwesomeIcon icon={solid('stopwatch')} />
        </span>
        <h1>{alarmMessage}</h1>
      </Warning>}
      <ClockTimeLine
        timerCategory={category}
        startInMs={startInMs}
        alarmHandler={setAlarm}
        isDone={isDone}
        setDone={setDone}
      />
      <Tags>
        {timers.map(({ name, qty, fontColor, backgroundColor }) => {
          return (
            <Tag
              key={name}
              fontColor={fontColor}
              backgroundColor={backgroundColor}
            >
              {name + ' x' + qty}
            </Tag>
          )
        })}
      </Tags>
    </StyledSubtask>
  )
}

const StyledSubtask = styled.div<{ isDone: boolean }>`
  ${props => props.isDone && 'filter: grayscale(1);'}
  border: 1px solid lightgrey;
  padding: 8px;
  display: flex;
  flex-direction: column;
  position: relative;

  & + & {
    border-top: none;
  }
`

const WarnBlinkingAnimation = keyframes`
    0% { background-color: #ffa8a8; }
   16% { background-color: #ffa8a8; }
   32% { background-color: #ff8c8c; }
   48% { background-color: #ff6666; }
   64% { background-color: #fd4b4b; }
   80% { background-color: #ff6666; }
  100% { background-color: #ff8c8c; }
`

const WarnBar = styled.div`
  position: absolute;
  top: 0;
  left: -9px;
  width: 8px;
  height: 100%;
  animation: ${WarnBlinkingAnimation} 1s infinite;
`

const WiggleAnimation = keyframes`
   15% { transform: rotate(5deg); }
   25% { transform: rotate(10deg); }
   50% { transform: rotate(0deg); }
   60% { transform: rotate(-5deg); }
   75% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
`

const Warning = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 30%;
  left: -92px;
  width: 10vh;

  &:hover {
    color: grey;
  }

  h1 {
    text-transform: uppercase;
    font-weight: bold;
  }

  span {
    font-size: 2rem;
    margin-bottom: 4px;
    animation: ${WiggleAnimation} .12s infinite;
  }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
`

const Tag = styled.div<{ readonly backgroundColor: string, readonly fontColor: string }>`
  color: ${props => props.fontColor};
  background-color: ${props => props.backgroundColor};
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 4px 8px;
  /* TODO #3 remove duplication */
  border: ${props =>
    props.backgroundColor == 'white'
      ? `1px solid ${props.fontColor}`
      : 'none'
  };
`

export default Subtask