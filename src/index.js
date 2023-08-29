import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import Home from './pages/Home'
import Error from './components/Error'
import AddHabitOne from './pages/AddHabitOne'
import AddHabitTwo from './pages/AddHabitTwo'
import Stats from './pages/Stats'
import GlobalStyle from './utils/style/GlobalStyle'

import CalendarPage from './pages/CalendarPage'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/AddHabitOne" element={<AddHabitOne />} />
        <Route path="/AddHabitTwo" element={<AddHabitTwo />} />
        <Route path="/Stats" element={<Stats />} />
        <Route path="/CalendarPage" element={<CalendarPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
