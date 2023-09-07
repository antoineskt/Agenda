import React from 'react'
import styled from 'styled-components'
import TaskList from '../TaskList'
import { useData } from '../../utils/Datas'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

const TaskDetailsContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`

const TaskOverlay = ({ selectedDay, onClose }) => {
  const { items, deleteTask, editTask, serieCount } = useData()
  return (
    <Overlay>
      <TaskDetailsContainer>
        <h3 style={{ color: 'black' }}>
          Tâche(s) du {selectedDay.format('dddd D MMMM')}
        </h3>
        <TaskList
          items={items}
          selectedDate={selectedDay.format('dddd D MMMM')}
          deleteTask={deleteTask}
          editTask={editTask}
          serieCount={serieCount}
          showSlideButton={false}
          shouldBeFilteredByDate={true}
        />
        <button onClick={onClose}>Close</button>
      </TaskDetailsContainer>
    </Overlay>
  )
}

export default TaskOverlay
