import { useState, useEffect } from "react"
import styled from "styled-components"

const useForceUpdate = () => {
  const [, setValue] = useState(0)

  return () => { setValue(old => old + 1) }
}

const Clock = ({ totalInSec, startInMs }: { totalInSec: number, startInMs: number }) => {
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const formattedTime = () => {
    const passedInSec = Math.floor((Date.now() - startInMs) / 1000)
    const leftInSec = totalInSec - passedInSec
    const minLeft = Math.floor(leftInSec / 60)
    const secLeft = leftInSec % 60

    return `${padTime(minLeft)}:${padTime(secLeft)}`
  }

  // TODO #2: remove duplication
  const padTime = (number: number) => number.toString().padStart(2, '0')

  return (
    <StyledClock>{formattedTime()}</StyledClock>
  )
}

const StyledClock = styled.div`
  font-size: 4rem;
`

export default Clock