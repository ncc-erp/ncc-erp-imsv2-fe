import { setupInterceptors } from "@/api/interceptors"
import axios from "axios"
export * as commonApi from "@/api/apiCommon"
export * as configApi from "@/api/apiConfig"
export * as entityTypesApi from "@/api/apiEntityTypes"
export * as newsApi from "@/api/apiNews"
export * as userApi from "@/api/apiUser"
export * as widgetApi from "@/api/apiWidget"
export * as commentApi from "@/api/apiComment"
export * as timesheetApi from "@/api/apiTimeSheet"
export * as albumsApi from "@/api/apiAlbums"
export * as hrmApi from "@/api/apiHrm"
export * as logApi from "@/api/apiLog"
export * as fileApi from "@/api/apiFile"

const AxiosClient = axios.create({
  baseURL:
    !import.meta.env.VITE_USE_MOCK && import.meta.env.VITE_REACT_APP_BASE_URL
      ? import.meta.env.VITE_REACT_APP_BASE_URL
      : "",
  headers: {
    Accept: "application/json"
  }
})

setupInterceptors(AxiosClient)

export default AxiosClient
