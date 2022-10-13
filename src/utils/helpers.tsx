import { TimerCategory, Timer } from "./types"

type GroupedTimers = {
  [Property in keyof TimerCategory]: Timer[]
}

const timersGroupedByCategory = (collection: any[]): GroupedTimers => {
  return collection.reduce((result, current) => {
    const group = current['category']
    result[group] ||= []
    result[group].push(current)
    return result
  }, {})
}

export { timersGroupedByCategory }