import { TimerCategory } from "./types"

const Categories = {
  Normal: [5, 5, 5],
  Stuffed: [6, 6, 5],
  NewYork: [7, 7, 5],
} as const

const StepNames = {
  0: 'Lado 1',
  1: 'Lado 2',
  2: 'Descanso',
} as const

const StepDoneWarnings = {
  0: 'Virar!',
  1: 'Tirar!',
  2: 'Pronto!',
} as const

const AvailableCookies = [
  {
    name: 'Choco Chip',
    category: TimerCategory.Normal,
  },
  {
    name: 'White Macadamia',
    category: TimerCategory.Normal,
  },
  {
    name: 'Call of Churros',
    category: TimerCategory.Stuffed,
  },
  {
    name: 'Caramel Healer',
    category: TimerCategory.Stuffed,
  },
  {
    name: 'Choco Bomb',
    category: TimerCategory.Stuffed,
  },
  {
    name: 'Lemon Up',
    category: TimerCategory.Stuffed,
  },
  {
    name: 'Nutella Extreme',
    category: TimerCategory.Stuffed,
  },
  {
    name: 'Red Velvet Redemption',
    category: TimerCategory.Stuffed,
  },
  {
    name: 'Triple Kill',
    category: TimerCategory.Stuffed,
  },
  {
    name: 'All In',
    category: TimerCategory.NewYork,
  },
  {
    name: 'Fragmallow',
    category: TimerCategory.NewYork,
  },
]

export { AvailableCookies, Categories, StepNames, StepDoneWarnings }