import React from 'react'
import styled from 'styled-components'

const StyledDaysButton = styled.button`
  color: white;
  background-color: black;
  font-size: 1.5em;
  margin: 5px;
  width: 70px;
  height: 70px;
  border-radius: 30%;
  &:hover {
    background-color: #faca21;
  }
  /* Media query pour un écran de 768px ou moins */
  @media (max-width: 768px) {
    font-size: 0.8em;
    margin: 3px;
    width: 40px;
    height: 40px;
  }
`

export default function DaysButtonHome({ weekdays, handleDayClick }) {
  return (
    <div>
      {weekdays.map((day) => (
        <StyledDaysButton onClick={() => handleDayClick(day)} key={day}>
          {day.format('ddd')}
        </StyledDaysButton>
      ))}
    </div>
  )
}
