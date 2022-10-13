import styled from "styled-components"
import { Timer } from "../utils/GoCookiesDatabase"
import ClockTimeLine from "./ClockTimeLine"

const Subtask = ({ category, timers, startInMs }: { category: string, timers: Timer[], startInMs: number }) => {
  return (
    <StyledTimer>
      <ClockTimeLine
        timerCategory={category}
        startInMs={startInMs}
      />
      <Tags>
        {timers.map(({ name, qty }) => {
          return (
            <Tag key={name}>{name + ' x' + qty}</Tag>
          )
        })}
      </Tags>
    </StyledTimer>
  )
}

const StyledTimer = styled.div`
  margin-top: 4px;
  background-color: lightgray;
  padding: 8px;
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

export default Subtask