import { useState, useEffect } from "react"
import styled from "styled-components"
import { Categories, Steps } from "../utils/GoCookiesDatabase"

const useForceUpdate = () => {
  const [, setValue] = useState(0)

  return () => { setValue(old => old + 1) }
}

const ClockTimeLine = ({ timerCategory, startInMs }: { timerCategory: string, startInMs: number }) => {
  const forceUpdate = useForceUpdate()
  const totalInSec = Categories[timerCategory].reduce((acc, current) => acc + current)
  const passedInSec = Math.floor((Date.now() - startInMs) / 1000)
  const leftInSec = totalInSec - passedInSec

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

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

  const stepSeconds = (stepTimeInSec: number, currentStep: number, stepSecs: number[]) => {
    const stepMin = sumTil(stepSecs, currentStep)
    const stepMax = sumTil(stepSecs, currentStep + 1)
    const stepFull = stepSecs.reduce((acc, val) => acc + val)

    const timerSecs = () => {
      const currentSec = stepFull - leftInSec

      if (currentSec < stepMin) return stepTimeInSec
      if (currentSec > stepMax) return 0

      const timeFromNextSteps = stepFull - stepMax

      return leftInSec - timeFromNextSteps
    }

    return (
      <Step key={currentStep}>
        <div>{formatSeconds(timerSecs())}</div>
        <div>{Steps[currentStep]}</div>
      </Step>
    )
  }

  // TODO #2: remove duplication
  const padTime = (number: number) => number.toString().padStart(2, '0')

  return (
    <StyledClock>
      <ActualClock>{formatSeconds(leftInSec)}</ActualClock>
      <Timeline>
        {Categories[timerCategory].map(stepSeconds)}
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
