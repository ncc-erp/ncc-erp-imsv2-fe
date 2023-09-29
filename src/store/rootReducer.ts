import { AnyAction, combineReducers, Reducer } from "redux"
import newsSlice from "@/store/news"
import userSlice from "@/store/user"
import widgetSlice from "@/store/widget"
import configSlice from "@/store/config"
import globalSlice from "@/store/global"
import commonSlice from "@/store/common"
import albumsSlice from "@/store/albums"
import logSlice from "@/store/log"
import entityTypesSlice from "@/store/entityTypes"
import { AppState } from "@/store/index"

export const DESTROY_ACTION = "DESTROY_STORE"

export const combinedReducer = combineReducers({
  user: userSlice,
  news: newsSlice,
  widget: widgetSlice,
  config: configSlice,
  global: globalSlice,
  common: commonSlice,
  entityTypes: entityTypesSlice,
  albums: albumsSlice,
  log: logSlice
})

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  if (action.type === DESTROY_ACTION) {
    state = {} as AppState
  }
  return combinedReducer(state, action)
}

export default rootReducer
