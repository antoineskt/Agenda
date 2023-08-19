import React from 'react'
import dayjs from 'dayjs'
import DaysButtonHome from '../../components/DaysButtonHome'

const DateSelector = ({ setSelectedDate }) => {
  const startOfWeek = dayjs().startOf('week')

  const weekdays = new Array(7)
    .fill(startOfWeek)
    .map((day, idx) => day.add(idx, 'day'))

  const handleDayClick = (day) => {
    const formattedDate = day.format('dddd D MMMM')
    setSelectedDate(formattedDate)
  }

  return <DaysButtonHome weekdays={weekdays} handleDayClick={handleDayClick} />
}

export default DateSelector
