import AxiosClient from "@/api"
import { ISubmitWidgetsPayload } from "@/types"

const baseApiUrl = "/widgets"

export const getAllWidgets = () => {
  return AxiosClient.get(`${baseApiUrl}`).then((res) => res.data)
}

export const getAllWidgetsAdmin = () => {
  return AxiosClient.get(`${baseApiUrl}/list`).then((res) => res.data)
}

export const getCurrentWidgets = () => {
  return AxiosClient.get(`${baseApiUrl}/my-dashboard`).then((res) => res.data)
}

export const submitCurrentWidgets = (payload: ISubmitWidgetsPayload[]) => {
  return AxiosClient.post(`${baseApiUrl}/my-dashboard`, payload).then(
    (res) => res.data
  )
}

export const createWidget = (payload: FormData) => {
  return AxiosClient.post(`${baseApiUrl}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then((res) => res.data)
}

export const updateWidget = (payload: FormData) => {
  return AxiosClient.put(`${baseApiUrl}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then((res) => res.data)
}

export const enableWidget = (id: number) => {
  return AxiosClient.get(`${baseApiUrl}/${id}/enable`)
}

export const disableWidget = (id: number) => {
  return AxiosClient.get(`${baseApiUrl}/${id}/disable`)
}
