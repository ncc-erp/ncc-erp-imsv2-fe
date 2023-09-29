import { IUserRole } from "@/types"
import AxiosClient from "."

const url = "/admin"

export const _fetchListUserRole = () => {
  return AxiosClient.get(`${url}/role`).then((res) => {
    return res.data
  })
}

export const _fetchAddUserRole = (data: IUserRole) => {
  return AxiosClient.post(`${url}/role`, data).then((res) => res.data)
}

export const _fetchEditUserRole = (data: IUserRole, id: string) => {
  return AxiosClient.put(`${`${url}/role`}/${id}`, data).then((res) => res.data)
}

export const _fetchDeleteUserRole = (id: string) => {
  return AxiosClient.put(`${`${url}/role`}/${id}`).then((res) => res.data)
}
