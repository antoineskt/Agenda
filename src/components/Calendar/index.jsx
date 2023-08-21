import React from 'react'
import fr from 'dayjs/locale/fr'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { useData } from '../../utils/Datas'
import { useState } from 'react'
import TaskOverlay from '../TaskOverlay'

dayjs.locale({
  ...fr,
  weekStart: 1,
})

const SectionCalendar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  padding: 0;
  margin: 20px auto;
  border: 1px solid #ccc;
`

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;

  padding: 16px;

  max-width: 600px;
`

const DayButton = styled.button`
  padding: 10px;
  text-align: center;
  background-color: ${(props) => (props.highlight ? '#FFD700' : '#F8F8F8')};
  border: #ccc;
  cursor: pointer;
  color: ${(props) => (props.currentMonth ? 'black' : '#ccc')};
  &:hover {
    background-color: #ddd;
  }

  &.currentDay {
    position: relative;
    /* styles pour le point sous la date */
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      background-color: black; /* couleur du point */
      border-radius: 50%;
    }
  }
`

const MonthTitle = styled.h2`
  text-align: center;

  padding: 0 30px 0px 30px;
`

const DayOfWeekHeader = styled.div`
  text-align: center;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 0.7em;
  }
`

const DivHeaderCalendar = styled.div`
  align-items: center;
  display: flex;
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

const ButtonChangeMonth = styled.button`
  border: none;
  font-size: 1em;
  background: none;
  &:hover {
    background-color: #ddd;
  }
`

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState(null)
  const [startOfMonth, setStartOfMonth] = useState(dayjs().startOf('month'))
  const { items } = useData()

  const startOfWeek = startOfMonth.startOf('week')
  const daysInCalendar = 6 * 7
  //on map les items pour avoir les dates, puis on jointe pour correspondre au format
  const formattedDates = items.map((task) => `'${task.date}'`).join(',')

  const daysArray = new Array(daysInCalendar)
    .fill(startOfWeek)
    .map((day, idx) => day.add(idx, 'day'))

  const handlePreviousMonth = () => {
    setSelectedDay(null) // Clear the selected day when changing months
    const previousMonth = startOfMonth.subtract(1, 'month') //substract method from dayjs
    setStartOfMonth(previousMonth)
  }

  const handleNextMonth = () => {
    setSelectedDay(null) // Clear the selected day when changing months
    const nextMonth = startOfMonth.add(1, 'month') //add methode from dayjs
    setStartOfMonth(nextMonth)
  }

  return (
    <SectionCalendar>
      <DivHeaderCalendar>
        {' '}
        <ButtonChangeMonth onClick={handlePreviousMonth}>
          &lt;
        </ButtonChangeMonth>
        <MonthTitle>{startOfMonth.format('MMMM YYYY')}</MonthTitle>
        <ButtonChangeMonth onClick={handleNextMonth}>&gt;</ButtonChangeMonth>
      </DivHeaderCalendar>
      <CalendarContainer>
        {DayOfWeekNames.map((dayName) => (
          <DayOfWeekHeader key={dayName}>{dayName}</DayOfWeekHeader>
        ))}
        {daysArray.map((day) => (
          <DayButton
            day={day}
            key={day}
            highlight={formattedDates.includes(day.format('dddd D MMMM'))}
            onClick={() => setSelectedDay(day)}
            className={day.isSame(dayjs(), 'day') ? 'currentDay' : ''}
            currentMonth={day.month() === startOfMonth.month()} // Pass the prop
          >
            {day.format('D')}
          </DayButton>
        ))}
      </CalendarContainer>
      {selectedDay &&
        formattedDates.includes(selectedDay.format('dddd D MMMM')) && (
          <TaskOverlay
            selectedDay={selectedDay}
            onClose={() => setSelectedDay(null)}
          />
        )}
    </SectionCalendar>
  )
}
