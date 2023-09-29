import { ISubmitWidgetsPayload, IWidgetRes } from "@/types"
import { createSlice } from "@reduxjs/toolkit"
import { extraReducers } from "./thunkApi"

export interface IWidgetStore {
  widgets: IWidgetRes[]
  currentWidgets: ISubmitWidgetsPayload[]
}

const initialState: IWidgetStore = {
  widgets: [],
  currentWidgets: [],
}

const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {},
  extraReducers: extraReducers,
})

export default widgetSlice.reducer
