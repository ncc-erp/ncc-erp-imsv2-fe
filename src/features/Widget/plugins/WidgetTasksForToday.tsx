import * as React from "react"
import { styled } from '@mui/system'
import { Box } from "@mui/material"
import { TodoListItem } from "@/features/TasksForToday/components/TodoListItem"

const TasksForTodayContainer = styled(Box)({
  maxHeight: '380px',
  overflowY: 'scroll'
});

export const fakeTodoItems = [
  {id: 1, title: 'To do task 1, do smt then do smt then do smt', state: 1},
  {id: 2, title: 'To do task 2', state: 1},
  {id: 3, title: 'To do task 2', state: 1},
  {id: 4, title: 'To do task 2', state: 1},
  {id: 5, title: 'To do task 2', state: 1},
  {id: 6, title: 'To do task 2', state: 0},
  {id: 7, title: 'To do task 2', state: 0},
  {id: 8, title: 'To do task 2', state: 0},
  {id: 9, title: 'To do task 2', state: 0},
  {id: 10, title: 'To do task 2', state: 0},
  {id: 11, title: 'To do task 2', state: 1},
  {id: 12, title: 'To do task 2', state: 1},
  {id: 13, title: 'To do task 2', state: 0},
  {id: 14, title: 'To do task 2', state: 0},
  {id: 15, title: 'To do task 2', state: 1},
  {id: 16, title: 'To do task 2', state: 1}
]

const TasksForToday = () => {
  return (
    <TasksForTodayContainer>
      <TodoListItem items={fakeTodoItems} />
    </TasksForTodayContainer>
  )
}

export default TasksForToday
