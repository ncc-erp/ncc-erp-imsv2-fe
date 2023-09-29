import { DataEntityTypesForm, IEntityTypesStore, NEWS_CATEGORY } from "@/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { MuiColorInputValue } from "mui-color-input"
import { initialState } from "."

export const entityTypesReducer = {
  updateEntityName: (
    state: IEntityTypesStore,
    action: PayloadAction<NEWS_CATEGORY>
  ) => {
    state.entityTypeData = {
      ...state.entityTypeData,
      ...{ entityName: action.payload }
    }
  },
  updateDisplayName: (
    state: IEntityTypesStore,
    action: PayloadAction<string>
  ) => {
    state.entityTypeData = {
      ...state.entityTypeData,
      ...{ displayName: action.payload }
    }
  },
  updateColor: (
    state: IEntityTypesStore,
    action: PayloadAction<MuiColorInputValue>
  ) => {
    state.entityTypeData.color = action.payload
  },
  updateIsActive: (
    state: IEntityTypesStore,
    action: PayloadAction<boolean>
  ) => {
    state.entityTypeData.isActive = action.payload
  },
  updateData: (
    state: IEntityTypesStore,
    action: PayloadAction<DataEntityTypesForm>
  ) => {
    state.entityTypeData = { ...state.entityTypeData, ...action.payload }
  },
  resetData: (state: IEntityTypesStore) => {
    state.entityTypeData = initialState.entityTypeData
  }
}
