import { AppState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"

const getSelf = (state: AppState) => state

export const sGetAlbums = createSelector(
  getSelf,
  (state: AppState) => state.albums.data
)

export const sGetFilterSearch = createSelector(
  getSelf,
  (state: AppState) => state.albums.filterSearch
)