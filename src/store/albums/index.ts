import { extraReducers } from "@/store/albums/thunkApi"
import { createSlice } from "@reduxjs/toolkit"
import { IAlbumsStore } from "@/types"

export const initialState: IAlbumsStore = {
  data: {
    data: [],
    pageCount: 0
  },
  filterSearch: {
    category: null
  }
}
const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers
})

export default albumsSlice.reducer
