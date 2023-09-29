import { albumsApi } from "@/api"
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction
} from "@reduxjs/toolkit"
import {
  IAlbumsSearch,
  IAlbumsStore,
  IFilterSearch,
  IAlbumsRespone,
  IAlbumSave
} from "@/types"
import { withParamsToastCatcher } from "../ToastCatcher"

export const getAllAdminAlbums = createAsyncThunk(
  "albums/getAllAdminAlbums",
  async (params: IAlbumsSearch) => {
    const res = await albumsApi.getAllAdminAlbums(params)
    return res
  }
)

export const getSearchFilters = createAsyncThunk(
  "albums/getSearchFilters",
  async () => {
    const res = await albumsApi.getSearchFilters();
    return res
  }
)

export const saveAlbum = createAsyncThunk(
  "albums/saveAlbum",
  withParamsToastCatcher(async (data: IAlbumSave) => {
    const res = await albumsApi.saveAlbum(data)
    return res;
  }, "Add new album successfully")
)


export const updateAlbum = createAsyncThunk(
  "albums/updateAlbum",
  withParamsToastCatcher(async ({id, data}: {id: string, data: IAlbumSave}) => {
    const res = await albumsApi.updateAlbum({id, params: data})
    return res;
  }, "update album successfully")
)

export const extraReducers = (
  builders: ActionReducerMapBuilder<IAlbumsStore>
) => {
  builders.addCase(
    getAllAdminAlbums.fulfilled,
    (state: IAlbumsStore, action: PayloadAction<IAlbumsRespone>) => {
      state.data = action.payload
    }
  )
  builders.addCase(
    getSearchFilters.fulfilled,
    (state: IAlbumsStore, action: PayloadAction<IFilterSearch>) => {
      state.filterSearch = action.payload
    }
  )
}
