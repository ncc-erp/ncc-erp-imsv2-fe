import { createSlice } from "@reduxjs/toolkit"
import { infiniteScrollReducer } from "./reducer"

interface InfiniteScrollState {
  items: string[]
  lastIndex: number
  hasMoreItems: boolean
}

const initialState: InfiniteScrollState = {
  items: [],
  lastIndex: 0,
  hasMoreItems: true,
}

const infiniteScrollSlice = createSlice({
  name: "infiniteScroll",
  initialState,
  reducers: infiniteScrollReducer,
})

export const { addItems } = infiniteScrollSlice.actions

export default infiniteScrollSlice.reducer
