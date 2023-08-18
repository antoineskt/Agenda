import React from 'react'
import Header from '../../components/Header'
import Calendar from '../../components/Calendar'
import { useState, useEffect } from 'react'

export default function CalendarPage() {
  const [items, setItems] = useState([])

  const getData = () => {
    const datas = JSON.parse(localStorage.getItem('todos'))
    console.log('je log les datas(homepage) : ' + JSON.stringify(datas))
    if (datas) {
      setItems(datas)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <Header />
      <div>
        <h1>Calendrier</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
          minima.
        </p>
      </div>
      <Calendar sendItems={items} />
    </div>
  )
}
