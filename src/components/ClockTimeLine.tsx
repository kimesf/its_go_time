import { useState, useEffect, useMemo } from "react"
import styled from "styled-components"
import { Categories, StepNames, StepDoneWarnings } from "../utils/goCookiesDatabase"
import { StepIndex, TimerCategory } from "../utils/types"

const useForceUpdate = () => {
  const [, setValue] = useState(0)

  return () => { setValue(old => old + 1) }
}

const ClockTimeLine = ({ timerCategory, startInMs, alarmHandler }:
  {
    timerCategory: keyof typeof TimerCategory,
    startInMs: number
    alarmHandler: (message: string) => void,
  }) => {
  const forceUpdate = useForceUpdate()
  const [timesInSec, totalInSec, warningTimes] = useMemo(() => {
    const timesInSec = Categories[timerCategory]
    const totalInSec = timesInSec.reduce((acc, current) => acc + current)

    let currentSum = 0
    const warningTimes = timesInSec.reduce((acc: number[], time: number) => {
      currentSum += time

      return [...acc, currentSum]
    }, [])

    return [timesInSec, totalInSec, warningTimes]
  }, [timerCategory])

  const passedInSec = Math.floor((Date.now() - startInMs) / 1000)
  const leftInSec = totalInSec - passedInSec

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [forceUpdate])

  useEffect(() => {
    maybeSetAlarm()
  })

  const maybeSetAlarm = () => {
    if (warningTimes.includes(passedInSec)) {
      const warningIndex: keyof typeof StepDoneWarnings = warningTimes.indexOf(passedInSec)

      alarmHandler(StepDoneWarnings[warningIndex])
    }
  }

  const formatSeconds = (seconds: number) => {
    const minLeft = Math.floor(seconds / 60)
    const secLeft = seconds % 60
    if (minLeft < 0 || secLeft < 0) return '00:00'

    return `${padTime(minLeft)}:${padTime(secLeft)}`
  }

  const sumTil = (numbers: number[], tilIndex: number) => {
    return numbers.reduce((acc, currentValue, index) => {
      const increment = index < tilIndex ? currentValue : 0

      return acc + increment
    }, 0)
  }

  const stepSeconds = (
    stepTimeInSec: number,
    currentStep: StepIndex,
    stepSecs: number[]
  ): JSX.Element => {
    const stepMin = sumTil(stepSecs, currentStep)
    const stepMax = sumTil(stepSecs, currentStep + 1)

    const timerSecs = () => {
      if (passedInSec < stepMin) return stepTimeInSec
      if (passedInSec > stepMax) return 0

      const timeFromNextSteps = totalInSec - stepMax

      return leftInSec - timeFromNextSteps
    }

    return (
      <Step key={currentStep}>
        <div>{formatSeconds(timerSecs())}</div>
        <div>{StepNames[currentStep]}</div>
      </Step>
    )
  }

  // TODO #2: remove duplication
  const padTime = (number: number) => number.toString().padStart(2, '0')

  return (
    <StyledClock>
      <ActualClock>{formatSeconds(leftInSec)}</ActualClock>
      <Timeline>
        {timesInSec.map(stepSeconds)}
      </Timeline>
    </StyledClock>
  )
}

const StyledClock = styled.div`
  display: flex;
`

const ActualClock = styled.div`
  font-size: 4rem;
`

const Timeline = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`

const Step = styled.div``

export default ClockTimeLine
