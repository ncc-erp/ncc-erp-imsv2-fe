import { IRequestParams } from "@/types/common"
import AxiosClient from "."
import { DataEntityTypesForm } from "@/types"

const url = "/entity-type"
export const getEntityTypes = async (params: IRequestParams) => {
  return AxiosClient.get(`${url}`, { params }).then((res) => {
    return res.data
  })
}
export const getEntityTypesAll = async (params: IRequestParams) => {
  return AxiosClient.get(`${url}/all`, { params }).then((res) => {
    return res.data
  })
}
export const getEntityType = (id: number) => {
  return AxiosClient.get(`${url}/${id}`).then((res) => {
    return res.data
  })
}
export const add = async (data: DataEntityTypesForm) => {
  return AxiosClient.post(url, data)
}
export const update = (data: DataEntityTypesForm) => {
  return AxiosClient.put(`${url}/${data.id}`, data)
}
