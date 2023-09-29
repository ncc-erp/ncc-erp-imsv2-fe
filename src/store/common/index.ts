import { extraReducers } from "@/store/common/thunkApi"
import { ICommonStore, ISelfieRes } from "@/types"
import { createSlice } from "@reduxjs/toolkit"

export const initialState: ICommonStore = {
  selfie: {} as ISelfieRes
}
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: extraReducers
})

export default commonSlice.reducer
