import { Timer, TimerCategory, StepIndex } from "./types"

const Categories = {
  Normal: [5, 5, 5],
  Stuffed: [6, 6, 5],
  NewYork: [7, 7, 5],
}

const StepNames = {
  [StepIndex.First]: 'Lado 1',
  [StepIndex.Second]: 'Lado 2',
  [StepIndex.Thirdy]: 'Descanso',
}

const StepDoneWarnings = {
  [StepIndex.First]: 'Virar!',
  [StepIndex.Second]: 'Tirar!',
  [StepIndex.Thirdy]: 'Pronto!',
}

const AvailableCookies: Timer[] = [
  {
    name: 'Choco Chip',
    category: TimerCategory.Normal,
    qty: 0,
  },
  {
    name: 'White Macadamia',
    category: TimerCategory.Normal,
    qty: 0,
  },
  {
    name: 'Call of Churros',
    category: TimerCategory.Stuffed,
    qty: 0,
  },
  {
    name: 'Caramel Healer',
    category: TimerCategory.Stuffed,
    qty: 0,
  },
  {
    name: 'Choco Bomb',
    category: TimerCategory.Stuffed,
    qty: 0,
  },
  {
    name: 'Lemon Up',
    category: TimerCategory.Stuffed,
    qty: 0,
  },
  {
    name: 'Nutella Extreme',
    category: TimerCategory.Stuffed,
    qty: 0,
  },
  {
    name: 'Red Velvet Redemption',
    category: TimerCategory.Stuffed,
    qty: 0,
  },
  {
    name: 'Triple Kill',
    category: TimerCategory.Stuffed,
    qty: 0,
  },
  {
    name: 'All In',
    category: TimerCategory.NewYork,
    qty: 0,
  },
  {
    name: 'Fragmallow',
    category: TimerCategory.NewYork,
    qty: 0,
  },
]

export { AvailableCookies, Categories, StepNames, StepDoneWarnings }