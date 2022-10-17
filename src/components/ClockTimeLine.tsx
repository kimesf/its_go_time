import { useState, useEffect, useMemo } from "react"
import styled from "styled-components"
import { Categories, StepNames, StepDoneWarnings } from "../utils/goCookiesDatabase"
import { StepIndex, TimerCategory, AvailableTimerCategories } from "../utils/types"

const ClockTimeLine = ({ timerCategory, startInMs, alarmHandler }:
  {
    timerCategory: AvailableTimerCategories,
    startInMs: number
    alarmHandler: (message: string) => void,
  }) => {
  const forceRerender = useForceRerender()

  const [isDone, setIsDone] = useState(false)

  const [
    secondsPassed,
    secondsRemaining,
    stepsSecondsRemaining,
    warningTimes,
  ] = useClockTimes(startInMs, timerCategory)

  useEffect(() => {
    if (secondsRemaining > 0 || isDone) return

    setIsDone(true)
  })

  useEffect(() => {
    if (!warningTimes.includes(secondsPassed)) return

    const warningIndex: keyof typeof StepDoneWarnings =
      warningTimes.indexOf(secondsPassed)

    const alarmMessage = StepDoneWarnings[warningIndex]

    alarmHandler(alarmMessage)
  })

  useEffect(() => {
    if (isDone) return

    setTimeout(forceRerender, 1000)
  }, [isDone, forceRerender])

  const stepName = (key: StepIndex) => StepNames[key as StepIndex]

  const formatSeconds = (seconds: number) => {
    const minutesLeft = Math.floor(seconds / 60)
    const secondsLeft = seconds % 60

    if (minutesLeft < 0 || secondsLeft < 0) {
      return '00:00'
    }

    const padTime = (number: number) => number.toString().padStart(2, '0')

    return [minutesLeft, secondsLeft].map(padTime).join(':')
  }

  return (
    <StyledClock>
      <ActualClock>{formatSeconds(secondsRemaining)}</ActualClock>
      <Timeline>
        {stepsSecondsRemaining.map((stepSecondsRemaining, stepIndex) =>
          <Step key={stepIndex}>
            <StepClock>{formatSeconds(stepSecondsRemaining)}</StepClock>
            <StepName>{stepName(stepIndex as StepIndex)}</StepName>
          </Step>
        )}
      </Timeline>
    </StyledClock>
  )
}

const StyledClock = styled.div`
  display: flex;
`

const ActualClock = styled.div`
  font-size: 4rem;
  font-family: monospace;
  padding: 4px;
`

const Timeline = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StepClock = styled.div`
  font-size: 1.4rem;
  font-family: monospace;
`

const StepName = styled.div``

const useForceRerender = () => {
  const [, setValue] = useState(0)

  return () => { setValue(old => old + 1) }
}

const useClockTimes = (
  startInMs: number,
  timerCategory: AvailableTimerCategories,
): [
    number,
    number,
    number[],
    number[],
  ] => {

  const stepsSeconds = Categories[timerCategory]

  const warningTimes = useMemo(() => {
    let currentSum = 0
    return stepsSeconds.reduce((acc: number[], time: number) => {
      currentSum += time

      return [...acc, currentSum]
    }, [])
  }, [stepsSeconds])

  const totalSeconds = useMemo(() => {
    return stepsSeconds.reduce((acc, current) => acc + current)
  }, stepsSeconds)

  const secondsPassed = Math.floor((Date.now() - startInMs) / 1000)
  const secondsRemaining = totalSeconds - secondsPassed

  const sumTil = (numbers: number[], tilIndex: number) => {
    return numbers.reduce((acc, currentValue, index) => {
      const increment = index < tilIndex ? currentValue : 0

      return acc + increment
    }, 0)
  }

  const stepsSecondsRemaining = stepsSeconds.map((stepSeconds, stepIndex) => {
    const stepMin = sumTil(stepsSeconds, stepIndex)
    const stepMax = sumTil(stepsSeconds, stepIndex + 1)

    if (secondsPassed < stepMin) return stepSeconds
    if (secondsPassed > stepMax) return 0

    const timeFromNextSteps = totalSeconds - stepMax

    return secondsRemaining - timeFromNextSteps
  })

  return [secondsPassed, secondsRemaining, stepsSecondsRemaining, warningTimes]
}

export default ClockTimeLine
