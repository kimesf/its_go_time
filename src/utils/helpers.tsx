import { Timer, AvailableTimerCategories } from "./types"

type TimersGrouped = {
  [K in AvailableTimerCategories]?: Timer[]
}

const timersGroupedByCategory = (collection: Timer[]): TimersGrouped => {
  return collection.reduce((acc: TimersGrouped, current) => {
    const group: AvailableTimerCategories = current['category']

    acc[group] ||= []
    acc[group]?.push(current)

    return acc
  }, {})
}

export { timersGroupedByCategory }