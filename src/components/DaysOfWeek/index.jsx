import React from 'react'
import DayButton from '../DayButton'

export default function DaysOfWeek({
  weekdays,
  handleDayClick,
  selectedDateFormatted,
  arrayOfselectedDateFormattedRightFormat,
  items,
}) {
  //on affiche chaque jours de la semaine actuelle récupérée de weekdays
  return (
    <div>
      {weekdays.map((day) => (
        <DayButton
          items={items}
          onClick={() => handleDayClick(day)}
          key={day}
          //on affiche le bouton supprimer uniquement si il n'a pas deja été cliqué (permet le désélection)
          isActive={
            selectedDateFormatted
              ? selectedDateFormatted.length >= 1 &&
                arrayOfselectedDateFormattedRightFormat &&
                arrayOfselectedDateFormattedRightFormat.includes(
                  day.format('dddd D MMMM')
                )
              : false
          }
        >
          {day.format('ddd')}
        </DayButton>
      ))}
    </div>
  )
}
