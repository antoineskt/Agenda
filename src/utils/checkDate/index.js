import { FormattedDateOfToday } from '../functionDate'
export const isAfuturDate = ({ selectedDate, date }) => {
  //renvoie true si la date selectionné est une date future
  if (date.indexOf(FormattedDateOfToday) < date.indexOf(selectedDate)) {
    return true
  } else {
    return false
  }
}
