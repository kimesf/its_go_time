enum TimerCategory {
  Normal = 'Normal',
  Stuffed = 'Stuffed',
  NewYork = 'NewYork',
}

interface Timer {
  name: string,
  category: TimerCategory,
  qty: number
}

interface Task {
  name: string,
  timers: Timer[],
  start: number,
}

export { type Timer, type Task, TimerCategory }

