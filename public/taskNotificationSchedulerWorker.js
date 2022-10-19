// TODO: how to create this worker using ts?
// TODO: remove duplication, there is plenty in here
const SECONDS_IN_ADVANCE = 10
const MS_IN_ADVANCE = SECONDS_IN_ADVANCE * 1000

onmessage = (e) => {
  const startInMs = e.data.start
  const timersByCategory = groupBy(e.data.timers, 'category')

  Object.entries(timersByCategory).forEach((entry) => {
    scheduleNotifications(entry, startInMs)
  })
}

const scheduleNotifications = ([category, timers], startInMs) => {
  const names = stepName(timers)

  warningTimesInMs(category).forEach((ms, stepIndex) => {
    setTimeout(() => {
      new Notification(
        `Em ${SECONDS_IN_ADVANCE} segundos, ${StepDoneWarnings[stepIndex]}:`,
        { body: names.join(' | ') }
      )

      postMessage('about to warn')
    }, ms - MS_IN_ADVANCE)
  })
}

const warningTimesInMs = (category) => {
  const stepsDurationInSeconds = Categories[category]

  let warningTime = 0
  return stepsDurationInSeconds.map((stepDuration) => {
    warningTime += stepDuration

    return warningTime * 1000
  }, [])
}

const stepName = (timers) => {
  return timers.map(({ name, qty }) => name + ' x' + qty)
}

const groupBy = (collection, key) => {
  return collection.reduce((acc, currentValue) => {
    const group = currentValue[key]

    acc[group] ||= []
    acc[group].push(currentValue)

    return acc
  }, {})
}

const Categories = {
  Normal: [300, 300, 300],
  Stuffed: [360, 360, 300],
  NewYork: [420, 420, 300],
}

const StepDoneWarnings = {
  0: 'Virar',
  1: 'Tirar',
  2: 'Pronto',
}