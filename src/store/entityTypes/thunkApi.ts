import { entityTypesApi } from "@/api"
import {
  DataEntityTypesForm,
  IEntityTypesStore,
  ITableEntityData
} from "@/types"
import { IRequestParams } from "@/types/common"
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk
} from "@reduxjs/toolkit"
import { withParamsToastCatcher } from "../ToastCatcher"

export const getEntityTypes = createAsyncThunk(
  "entityTypes/getEntityTypes",
  async (params: IRequestParams) => {
    const res = await entityTypesApi.getEntityTypes(params)
    return res
  }
)
export const getEntityTypesAll = createAsyncThunk(
  "entityTypes/getEntityTypesAll",
  async (params: IRequestParams) => {
    const res = await entityTypesApi.getEntityTypesAll(params)
    return res
  }
)
export const getEntityType = createAsyncThunk(
  "entityTypes/getEntityType",
  async (id: number) => {
    const res = await entityTypesApi.getEntityType(id)
    return res
  }
)
export const postEntityType = createAsyncThunk(
  "entityTypes/postEntityType",
  withParamsToastCatcher(async (data: DataEntityTypesForm) => {
    await entityTypesApi.add(data)
  }, "Add Categories successfully")
)
export const putEntityType = createAsyncThunk(
  "entityTypes/putEntityType",
  withParamsToastCatcher(async (data: DataEntityTypesForm) => {
    await entityTypesApi.update(data)
  }, "Edit Categories successfully")
)
export const extraReducers = (
  builders: ActionReducerMapBuilder<IEntityTypesStore>
) => {
  builders.addCase(
    getEntityTypes.fulfilled,
    (state: IEntityTypesStore, action: PayloadAction<ITableEntityData>) => {
      state.tableEntityData = action.payload
    }
  )
  builders.addCase(
    getEntityTypesAll.fulfilled,
    (state: IEntityTypesStore, action: PayloadAction<ITableEntityData>) => {
      state.tableEntityData = action.payload
    }
  )
  builders.addCase(
    getEntityType.fulfilled,
    (state: IEntityTypesStore, action: PayloadAction<DataEntityTypesForm>) => {
      state.entityTypeData = action.payload
    }
  )
}
