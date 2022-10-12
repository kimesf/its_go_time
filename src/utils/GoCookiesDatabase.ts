enum TimerCategory {
  Normal = 'Normal',
  Stuffed = 'Stuffed',
  NewYork = 'NewYork',
}

const Timers = {
  Normal: [300, 300, 300],
  Stuffed: [360, 360, 300],
  NewYork: [420, 420, 300],
} as const

const AvailableCookies = [
  {
    name: 'Choco Chip',
    timer: TimerCategory.Normal,
  },
  {
    name: 'White Macadamia',
    timer: TimerCategory.Normal,
  },
  {
    name: 'Call of Churros',
    timer: TimerCategory.Stuffed,
  },
  {
    name: 'Caramel Healer',
    timer: TimerCategory.Stuffed,
  },
  {
    name: 'Choco Bomb',
    timer: TimerCategory.Stuffed,
  },
  {
    name: 'Lemon Up',
    timer: TimerCategory.Stuffed,
  },
  {
    name: 'Nutella Extreme',
    timer: TimerCategory.Stuffed,
  },
  {
    name: 'Red Velvet Redemption',
    timer: TimerCategory.Stuffed,
  },
  {
    name: 'Triple Kill',
    timer: TimerCategory.Stuffed,
  },
  {
    name: 'All In',
    timer: TimerCategory.NewYork,
  },
  {
    name: 'Fragmallow',
    timer: TimerCategory.NewYork,
  },
]

export { AvailableCookies, Timers }