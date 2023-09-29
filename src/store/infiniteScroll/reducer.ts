import { PayloadAction } from "@reduxjs/toolkit"

interface InfiniteScrollState {
  items: string[]
  lastIndex: number
  hasMoreItems: boolean
}

export const infiniteScrollReducer = {
  addItems: (
    state: InfiniteScrollState,
    action: PayloadAction<{
      items: string[]
      lastIndex: number
      hasMoreItems: boolean
    }>,
  ) => {
    state.items.push(...action.payload.items)
    state.lastIndex = action.payload.lastIndex
    state.hasMoreItems = action.payload.hasMoreItems
  },
}
