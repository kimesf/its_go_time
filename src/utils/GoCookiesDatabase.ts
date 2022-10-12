enum TimerCategory {
  Normal = 'Normal',
  Stuffed = 'Stuffed',
  NewYork = 'NewYork',
}

const categorys = {
  Normal: [300, 300, 300],
  Stuffed: [360, 360, 300],
  NewYork: [420, 420, 300],
} as const

interface Timer {
  name: string,
  category: TimerCategory,
}

const AvailableCookies: Timer[] = [
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

export { AvailableCookies, type Timer }