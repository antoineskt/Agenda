import dayjs from 'dayjs'
import fr from 'dayjs/locale/fr'
dayjs.locale({
  ...fr,
  weekStart: 1,
})

export const today = dayjs() //today without format
export const formattedDateOfToday = today.format('dddd D MMMM')
export const formattedDateOfTodayForCompair = today.format('YYYY-MM-DD')
export const startOfWeek = dayjs().startOf('week')

export const weekdays = new Array(7)
  .fill(startOfWeek)
  .map((day, idx) => day.add(idx, 'day'))

export const orderByDate = (selectedDateFormatted) => {
  return selectedDateFormatted.sort((a, b) => (a.isBefore(b) ? -1 : 1))
}
