import { IWidgetStore } from "@/store/widget"
import { ISubmitWidgetsPayload, IWidgetRes } from "@/types"
import { widgetApi } from "@api"
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction
} from "@reduxjs/toolkit"
import { withParamsToastCatcher } from "@/store/ToastCatcher"

export const getAllWidgets = createAsyncThunk("widget/get", async () => {
  const res = await widgetApi.getAllWidgets()
  return res
})
export const getAllWidgetsAdmin = createAsyncThunk("widget/get", async () => {
  const res = await widgetApi.getAllWidgetsAdmin()
  return res
})

export const getCurrentWidgets = createAsyncThunk(
  "widget/current",
  async () => {
    const res = await widgetApi.getCurrentWidgets()
    return res
  }
)

export const submitCurrentWidgets = createAsyncThunk(
  "widget/submitCurrentWidgets",
  async (payload: ISubmitWidgetsPayload[]) => {
    const res = await widgetApi.submitCurrentWidgets(payload)
    return res
  }
)

export const createWidget = createAsyncThunk(
  "widget/createInstance",
  withParamsToastCatcher(async (payload: FormData) => {
    const res = await widgetApi.createWidget(payload)
    return res
  }, "Create new widget successfully")
)

export const updateWidget = createAsyncThunk(
  "widget/updateInstance",
  withParamsToastCatcher(async (payload: FormData) => {
    const res = await widgetApi.updateWidget(payload)
    return res
  }, "Update new widget successfully")
)

export const disableWidget = createAsyncThunk(
  "widget/disableInstance",
  withParamsToastCatcher(async (id: number) => {
    await widgetApi.disableWidget(id)
  }, "Disabled widget")
)

export const enableWidget = createAsyncThunk(
  "widget/enabledInstance",
  withParamsToastCatcher(async (id: number) => {
    await widgetApi.enableWidget(id)
  }, "Enabled widget")
)

export const extraReducers = (
  builders: ActionReducerMapBuilder<IWidgetStore>
) => {
  builders.addCase(
    getAllWidgets.fulfilled,
    (state: IWidgetStore, action: PayloadAction<IWidgetRes[]>) => {
      state.widgets = action.payload
    }
  )
  builders.addCase(
    getCurrentWidgets.fulfilled,
    (state: IWidgetStore, action: PayloadAction<ISubmitWidgetsPayload[]>) => {
      state.currentWidgets = action.payload
    }
  )
  builders.addCase(
    createWidget.fulfilled,
    (state: IWidgetStore, action: PayloadAction<IWidgetRes>) => {
      state.widgets = [...state.widgets, action.payload]
    }
  )
  builders.addCase(
    updateWidget.fulfilled,
    (state: IWidgetStore, action: PayloadAction<IWidgetRes>) => {
      state.widgets = [...state.widgets, action.payload]
    }
  )
}
