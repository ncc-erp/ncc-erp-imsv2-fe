import AxiosClient from '.'
import { IAlbumsSearch, IAlbumSave } from '@/types'

const url = "/albums"

export const getAllAlbums = async (params?: IAlbumsSearch) => {
  const res = await AxiosClient.get(url, { params })
  return res.data
}

export const getAllAdminAlbums = async (params?: IAlbumsSearch) => {
  const res = await AxiosClient.get(url + "/admin", { params })
  return res.data
}

export const saveAlbum = async (params: IAlbumSave) => {
  const res = await AxiosClient.post(url, params,
    { headers: { "Content-Type": "multipart/form-data" } });
  return res.data
}

export const updateAlbum = async ({ id, params }: {id: string, params: IAlbumSave}) => {
  const res = await AxiosClient.put(`${url}/${id}`, params,
  { headers: { "Content-Type": "multipart/form-data" } })
  return res.data
}

export const getSearchFilters = async () => {
  const res = await AxiosClient.get(url + "/search-filter")
  return res.data
}

export const getAlbumList = (
  year: string | null,
  categoryId: string,
  query: string,
  page: number
) => {
  return AxiosClient.get(
    `${url}?categoryId=${categoryId}&search=${query}&page=${page}&size=6${
      year !== null ? `&year=${year}` : ""
    }`
  ).then((res) => res.data)
}

export const getSearchFilter = () => {
  return AxiosClient.get(`${url}/search-filter`).then((res) => res.data)
}
