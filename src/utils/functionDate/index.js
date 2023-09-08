import dayjs from 'dayjs'

export const FormattedDateOfToday = dayjs().format('dddd D MMMM')

export const startOfWeek = dayjs().startOf('week')

export const weekdays = new Array(7)
  .fill(startOfWeek)
  .map((day, idx) => day.add(idx, 'day'))
