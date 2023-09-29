import { configApi } from "@/api"
import { IConfigData, IEmailSetting, IKomu } from "@/types"
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit"
import { IConfigStore } from "."

export const getConfigData = createAsyncThunk(
  "config/getConfigData",
  async () => {
    const res = await configApi.fetchConfigData()
    return res
  },
)

export const updateEmailConfig = createAsyncThunk(
  "config/updateEmail",
  async (data: IEmailSetting) => {
    const res = await configApi.updateEmailSetting(data)
    return res
  },
)

export const updateKomuConfig = createAsyncThunk(
  "config/updateKomu",
  async (data: IKomu) => {
    const res = await configApi.updateKomu(data)
    return res
  },
)

export const extraReducers = (
  builders: ActionReducerMapBuilder<IConfigStore>,
) => {
  builders.addCase(
    getConfigData.fulfilled,
    (state: IConfigStore, action: PayloadAction<IConfigData>) => {
      state.configData = action.payload
    },
  )
}
