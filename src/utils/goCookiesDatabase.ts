import { Timer, TimerCategory, StepIndex } from "./types"

// const Categories = {
//   Normal: [300, 300, 300],
//   Stuffed: [360, 360, 300],
//   NewYork: [420, 420, 300],
// }

const Categories = {
  Normal: [5, 5, 5],
  Stuffed: [6, 6, 5],
  NewYork: [7, 7, 5],
}

const CategoriesI18n = {
  Normal: 'Normal',
  Stuffed: 'Recheados',
  NewYork: 'New York',
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
    fontColor: 'white',
    backgroundColor: '#f07066',
  },
  {
    name: 'White Macadamia',
    category: TimerCategory.Normal,
    qty: 0,
    fontColor: '#f0625a',
    backgroundColor: 'white',
  },
  {
    name: 'Call of Churros',
    category: TimerCategory.Stuffed,
    qty: 0,
    fontColor: 'white',
    backgroundColor: '#f58322',
  },
  {
    name: 'Caramel Healer',
    category: TimerCategory.Stuffed,
    qty: 0,
    fontColor: 'white',
    backgroundColor: '#615273',
  },
  {
    name: 'Choco Bomb',
    category: TimerCategory.Stuffed,
    qty: 0,
    fontColor: 'white',
    backgroundColor: '#542b17',
  },
  {
    name: 'Lemon Up',
    category: TimerCategory.Stuffed,
    qty: 0,
    fontColor: 'white',
    backgroundColor: '#f4a49d',
  },
  {
    name: 'Nutella Extreme',
    category: TimerCategory.Stuffed,
    qty: 0,
    fontColor: 'white',
    backgroundColor: '#782d28',
  },
  {
    name: 'Red Velvet Redemption',
    category: TimerCategory.Stuffed,
    qty: 0,
    fontColor: 'white',
    backgroundColor: '#c24f3e',
  },
  {
    name: 'Triple Kill',
    category: TimerCategory.Stuffed,
    qty: 0,
    fontColor: 'white',
    backgroundColor: '#042c46',
  },
  {
    name: 'All In',
    category: TimerCategory.NewYork,
    qty: 0,
    fontColor: 'white',
    backgroundColor: '#2362af',
  },
  {
    name: 'Fragmallow',
    category: TimerCategory.NewYork,
    qty: 0,
    fontColor: 'white',
    backgroundColor: '#f0ba64',
  },
]

export { AvailableCookies, Categories, CategoriesI18n, StepNames, StepDoneWarnings }
