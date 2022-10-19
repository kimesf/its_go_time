import styled from 'styled-components'
import { useState, MouseEvent } from 'react'
import { AvailableCookies, CategoriesI18n } from '../utils/goCookiesDatabase'
import { Container } from './sharedstyles'
import { Timer } from '../utils/types'
import { timersGroupedByCategory } from '../utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const TaskBuilder = ({ handleSubmit, title }: { handleSubmit: (timers: Timer[]) => void, title: string }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [selectedTimers, setSelectedTimers] = useState(AvailableCookies)

  const addTask = () => {
    const newTaskTimers = selectedTimers.filter(({ qty }) => qty > 0)

    if (newTaskTimers && newTaskTimers.length) handleSubmit(newTaskTimers)

    toggleIsAdding()
  }

  const toggleIsAdding = () => {
    setIsAdding(prev => !prev)
    setSelectedTimers(AvailableCookies)
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

  return (
    <Container>
      <Header>
        <Logo>
          <span>
            <FontAwesomeIcon icon={solid('circle')} />
            <FontAwesomeIcon icon={solid('circle')} />
            <FontAwesomeIcon icon={solid('circle')} />
            <FontAwesomeIcon icon={solid('circle')} />
          </span>
          <h1>{title}</h1>
        </Logo>
        <Actions>
          {isAdding
            ? <>
              <Btn
                label={<FontAwesomeIcon icon={solid('check')} />}
                handleClick={addTask}
                /* TODO #4 move to css var */
                backgroundColor='#2c7ccf'
                fontColor='white'
                large
                iconOnly
              />
              <Btn
                label={<FontAwesomeIcon icon={solid('xmark')} />}
                handleClick={toggleIsAdding}
                backgroundColor='grey'
                fontColor='white'
                large
                iconOnly
              />
            </>
            : <Btn
              label={<FontAwesomeIcon icon={solid('plus')} />}
              handleClick={toggleIsAdding}
              /* TODO #4 move to css var */
              backgroundColor='#2c7ccf'
              fontColor='white'
              large
              iconOnly
            />}
        </Actions >
      </Header>
      {isAdding &&
        <div>
          {Object.entries(timersGroupedByCategory(selectedTimers)).map(([category, timers]) => {
            return (
              <Category key={category}>
                <header>
                  <h1>{CategoriesI18n[category as keyof typeof CategoriesI18n]}</h1>
                </header>
                <AvailableTimers>
                  {timers.map(({ name, fontColor, backgroundColor, qty }) => {
                    return (
                      <Option key={name}>
                        <Btn
                          fontColor={fontColor}
                          backgroundColor={backgroundColor}
                          label={name}
                          handleClick={() => selectTimer(name)}
                          handleRightClick={() => unselectTimer(name)}
                        />
                        {qty > 0 && <Qty>x{qty}</Qty>}
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

const Btn = ({ label, handleClick, handleRightClick, fontColor, backgroundColor, large = false, iconOnly = false }: {
  handleClick: () => void,
  handleRightClick?: () => void,
  label: JSX.Element | string,
  fontColor: string;
  backgroundColor: string;
  large?: boolean;
  iconOnly?: boolean;
}) => {
  const handleContextMenu = (event: MouseEvent) => {
    if (!handleRightClick) return
    handleRightClick()
    event.preventDefault()
  }

  return (
    <StyledBtn
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      fontColor={fontColor}
      backgroundColor={backgroundColor}
      large={large}
      iconOnly={iconOnly}
    >
      {label}
    </StyledBtn>
  )
}

const StyledBtn = styled.button<{ large: boolean, fontColor: string, backgroundColor: string, iconOnly: boolean }>`
  cursor: pointer;
  padding: 8px;
  box-shadow: 2px 2px 2px lightgrey;
  font-weight: bold;
  font-size: ${props => props.large ? '1.4rem' : '1rem'};
  color: ${props => props.fontColor};
  background-color: ${props => props.backgroundColor};
  /* TODO #3 remove duplication */
  border: ${props =>
    props.backgroundColor == 'white'
      ? `1px solid ${props.fontColor}`
      : 'none'
  };
  ${props => props.iconOnly && 'border-radius: 50%;'}
  ${props => props.iconOnly && 'width: 42px;'}
  ${props => props.iconOnly && 'height: 42px;'}

  &:hover {
    filter: opacity(70%);
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 1rem;
    /* TODO #4 move to css var */
    color: #f07066;

    & * {
      margin-right: 4px;
    } 
  }

  h1 {
    margin-left: 4px;
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: bold;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  }
`

const Qty = styled.span`
  position: absolute;
  z-index: 1;
  right: -10px;
  top: -4px;
  color: white;
  /* TODO #4 move to css var */
  background-color: #2c7ccf;
  /* border: 1px solid black; */
  padding: 4px;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: monospace;
  /* -webkit-text-stroke: 1px white; */
`

const Option = styled.div`
  font-size: 1.2rem;
  margin-right: 24px;
  margin-bottom: 8px;
  position: relative;
  
  button {
    width: 220px;
  }
`

const AvailableTimers = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row-reverse;

  button {
    margin-right: 16px;
  }
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

export default TaskBuilder