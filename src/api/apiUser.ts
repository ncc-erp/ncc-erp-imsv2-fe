import {
  DataUserForm,
  IUpdateUserRolePermissions,
  IUserRequestParams
} from "@/types"
import { IUpdateUserRole, IUserRolePermissions } from "@/types/users"
import { AxiosResponse } from "axios"
import AxiosClient from "."

const url = "/user"

export const login = (data: any) => {
  return AxiosClient.post("/auth/token", data).then((res) => res.data)
}
export const logout = () => {
  return AxiosClient.get("/auth/logout").then((res) => res.data)
}

export const refreshToken = (refreshToken: string) => {
  return AxiosClient.get("/auth/refresh", {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  }).then((res) => res.data)
}

export const getAll = () => {
  return AxiosClient.get(url).then((res) => res.data)
}

export const add = (data: DataUserForm) => {
  return AxiosClient.post(url, data)
}

export const updateUserRole = (data: IUpdateUserRole) => {
  return AxiosClient.put(`${url}/roles`, data)
}

export const getUsers = (params: IUserRequestParams) => {
  return AxiosClient.get(url, { params }).then((res) => res.data)
}

export const getWidgetLayout = (id: number) => {
  return AxiosClient.get(`${url}/${id}/widgetLayout`).then((res) => res.data)
}

export const getUserProfile = () => {
  return AxiosClient.get(`${url}/profile`).then((res) => res.data)
}

export const getUserRole = () => {
  return AxiosClient.get("roles").then((res) => res.data)
}

export const getUserRolePermissions = (role: string) => {
  return AxiosClient.get<unknown, AxiosResponse<IUserRolePermissions>>(
    "roles/permissions",
    {
      params: {
        role
      }
    }
  ).then((res) => res.data)
}

export const updateUserRolePermissions = (data: IUpdateUserRolePermissions) => {
  return AxiosClient.put("roles/permissions", data).then((res) => res.data)
}

export const uploadAvatar = (avatar: File) => {
  return AxiosClient.post(`${url}/avatar`, { avatar }, {
    headers: { "Content-Type": "multipart/form-data" }
  })
}
