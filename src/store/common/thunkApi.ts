import { commonApi } from "@/api"
import { ICommonStore, ISelfieRes } from "@/types/common"
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction
} from "@reduxjs/toolkit"

export const takeSelfie = createAsyncThunk(
  "news/takeSelfie",
  async (img: string, { rejectWithValue }) => {
    try {
      const res = await commonApi.takeSelfie({ img })
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const extraReducers = (
  builders: ActionReducerMapBuilder<ICommonStore>
) => {
  builders.addCase(
    takeSelfie.fulfilled,
    (state: ICommonStore, action: PayloadAction<ISelfieRes>) => {
      state.selfie = action.payload
    }
  )
}
