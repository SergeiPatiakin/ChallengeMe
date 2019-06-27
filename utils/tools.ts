import { Moment } from 'moment'

export const getTimeLabel = (startTime: Moment, endTime: Moment) => {
  const startTimeString = startTime.format('DD MMM')
  const endTimeString = endTime.format('DD MMM')
  if (startTimeString === endTimeString) {
    return startTimeString
  } else {
    return `${startTimeString} - ${endTimeString}`
  }
}

export function dummyAdderFunction(a: number, b: number) {
  return a + b
}
