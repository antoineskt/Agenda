import React from 'react'
import DayButton from '../DayButton'

export default function DaysOfWeek({
  weekdays,
  handleDayClick,
  selectedDate,
  formattedStateDay,
  items,
}) {
  return (
    <div>
      {weekdays.map((day) => (
        <DayButton
          items={items}
          onClick={() => handleDayClick(day)}
          key={day}
          isActive={
            selectedDate
              ? selectedDate.length >= 1 &&
                formattedStateDay.includes(day.format('dddd D MMMM'))
              : false
          }
        >
          {day.format('ddd')}
        </DayButton>
      ))}
    </div>
  )
}
