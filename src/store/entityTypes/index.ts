import { entityTypesReducer } from "@/store/entityTypes/reducer"
import { extraReducers } from "@/store/entityTypes/thunkApi"
import { IEntityTypesStore, NEWS_CATEGORY } from "@/types"
import { createSlice } from "@reduxjs/toolkit"

export const initialState: IEntityTypesStore = {
  tableEntityData: {
    data: [],
    itemCount: 0,
    pageCount: 0,
    page: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    size: 0
  },
  entityTypeData: {
    entityName: NEWS_CATEGORY.EVENTS,
    displayName: "",
    color: "#cd5c5c",
    isActive: true
  }
}
const entityTypesSlice = createSlice({
  name: "entityTypes",
  initialState,
  reducers: entityTypesReducer,
  extraReducers: extraReducers
})
export const {
  updateData,
  updateEntityName,
  updateDisplayName,
  updateColor,
  updateIsActive,
  resetData
} = entityTypesSlice.actions
export default entityTypesSlice.reducer
