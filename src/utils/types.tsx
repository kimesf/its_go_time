const TimerCategory = {
  Normal: 'Normal',
  Stuffed: 'Stuffed',
  NewYork: 'NewYork',
} as const

type TimerCategoryKeys = keyof typeof TimerCategory
type AvailableTimerCategories = typeof TimerCategory[TimerCategoryKeys]

enum StepIndex {
  First,
  Second,
  Thirdy,
}

interface Timer {
  name: string,
  category: AvailableTimerCategories,
  qty: number
}

interface Task {
  timers: Timer[],
  start: number,
}

export { type Timer, type Task, type AvailableTimerCategories, TimerCategory, StepIndex }

