import { useState } from 'react'
import { AvailableCookies, Timer } from '../utils/GoCookiesDatabase'
import { MouseEvent } from 'react'
import styled from 'styled-components'

interface TimerSelected extends Timer {
  qty: number
}

const defaultTimers = AvailableCookies.map((timer) => Object.assign(timer, { qty: 0 }))

const TaskBuilder = ({ handleSubmit }: { handleSubmit: (timers: Timer[]) => void }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [selectedTimers, setSelectedTimers] = useState<TimerSelected[]>(defaultTimers)

  const addTask = () => {
    const newTaskTimers = selectedTimers.filter(({ qty }) => qty > 0)

    if (newTaskTimers && newTaskTimers.length) handleSubmit(newTaskTimers)

    toggleIsAdding()
  }

  const toggleIsAdding = () => {
    setIsAdding(prev => !prev)
    setSelectedTimers(defaultTimers)
  }

  const updateSelectedTimers = (selectedName: string, qtyChange: number) => {
    setSelectedTimers((oldValue) => {
      const newValue = structuredClone(oldValue)

      return newValue.map((timer) => {
        if (timer.name != selectedName) return timer
        const newQty = timer.qty + qtyChange
        if (newQty >= 0) timer.qty = newQty
        return timer
      })
    })
  }

  const selectTimer = (name: string) => {
    updateSelectedTimers(name, +1)
  }

  const unselectTimer = (name: string) => {
    updateSelectedTimers(name, -1)
  }

  const groupBy = (collection: any[], key: string) => {
    return collection.reduce((result, current) => {
      const group = current[key]
      result[group] ||= []
      result[group].push(current)
      return result
    }, {})
  }
  return (
    <Container>
      <Actions>
        {isAdding
          ? <>
            <Btn label='✓' handleClick={addTask} />
            <Btn label='x' handleClick={toggleIsAdding} />
          </>
          : <Btn label='+' handleClick={toggleIsAdding} />}
      </Actions >
      {isAdding &&
        <div>
          {Object.entries(groupBy(selectedTimers, 'category')).map(([category, timers]) => {
            return (
              <Category key={category}>
                <header>
                  <h1>{category}</h1>
                </header>
                <AvailableTimers>
                  {timers.map(({ name, category, qty }) => {
                    return (
                      <Option key={name}>
                        <Btn
                          label={name}
                          handleClick={() => selectTimer(name)}
                          handleRightClick={() => unselectTimer(name)}
                        />
                        <Qty>x{qty}</Qty>
                      </Option >
                    )
                  })}
                </AvailableTimers>
              </Category>
            )
          })}
        </div>}
    </Container>
  )
}

const Btn = ({ label, handleClick, handleRightClick }: {
  label: string,
  handleClick: () => void,
  handleRightClick?: () => void,
}) => {
  const handleContextMenu = (event: MouseEvent) => {
    if (!handleRightClick) return
    handleRightClick()
    event.preventDefault()
  }

  return (
    <StyledBtn onClick={handleClick} onContextMenu={handleContextMenu}>
      {label}
    </StyledBtn>
  )
}

const StyledBtn = styled.button`
  padding: 8px;
  text-transform: uppercase;
`

const Qty = styled.span`
  background-color: red;
`

const Option = styled.div`
  font-size: 1.2rem;
  margin-right: 24px;
  margin-bottom: 8px;
  position: relative;
  
  button {
    width: 220px;
  }

  ${Qty} {
    position: absolute;
    z-index: 1;
    left: 208px;
    top: -4px;
  }
`

const AvailableTimers = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row-reverse;
`

const Category = styled.section`
  margin-bottom: 12px;

  header {
    margin-bottom: 4px;
  }

  h1 {
    font-size: 1.4rem;
  }
`

const Container = styled.div`
  margin: 0 16px 0 16px;
  background-color: pink;
`

export default TaskBuilder