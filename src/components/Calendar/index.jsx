import React from 'react'
import fr from 'dayjs/locale/fr'
import dayjs from 'dayjs'
import styled from 'styled-components'

dayjs.locale({
  ...fr,
  weekStart: 1,
})

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px auto;
  max-width: 600px;
`

const DayButton = styled.button`
  padding: 10px;
  text-align: center;
  background-color: ${(props) => (props.highlight ? '#FFD700' : '#f0f0f0')};
  border: #ccc;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`

const MonthTitle = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`

const DayOfWeekHeader = styled.div`
  text-align: center;
  font-weight: bold;
`

const DayOfWeekNames = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
]

export default function Calendar({ sendItems }) {
  const startOfMonth = dayjs().startOf('month')
  const startOfWeek = startOfMonth.startOf('week')
  const daysInCalendar = 5 * 7
  //on map les items pour avoir les dates, puis on jointe pour correspondre au format
  const formattedDates = sendItems.map((task) => `'${task.date}'`).join(',')
  console.log(formattedDates)

  const daysArray = new Array(daysInCalendar)
    .fill(startOfWeek)
    .map((day, idx) => day.add(idx, 'day'))

  const daysArrayFormatted = daysArray.map((day) => day.format('dddd D MMMM'))
  console.log(daysArrayFormatted)
  return (
    <div>
      <MonthTitle>{startOfMonth.format('MMMM YYYY')}</MonthTitle>
      <CalendarContainer>
        {DayOfWeekNames.map((dayName) => (
          <DayOfWeekHeader key={dayName}>{dayName}</DayOfWeekHeader>
        ))}
        {daysArray.map((day) => (
          <DayButton
            key={day}
            highlight={formattedDates.includes(day.format('dddd D MMMM'))}
          >
            {day.format('D')}
          </DayButton>
        ))}
      </CalendarContainer>
    </div>
  )
}
