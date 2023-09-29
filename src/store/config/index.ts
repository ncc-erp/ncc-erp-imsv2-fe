import { createSlice } from "@reduxjs/toolkit"
import { IConfigData } from "@/types"
import { extraReducers } from "./thunkApi"
export interface IConfigStore {
  configData: IConfigData
}

const initialState: IConfigStore = {
  configData: {
    email: {
      defaultFromAddress: "",
      defaultFromDisplayName: "",
      enableSsl: false,
      host: "",
      password: "",
      port: "",
      userName: "",
    },
    komu: {
      enableAllowCheckInIMSForAll: false,
      enableToNoticeKomu: false,
    },
  },
}

const slice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: extraReducers,
})

export default slice.reducer
