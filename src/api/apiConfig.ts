import { IEmailSetting, IKomu } from "@/types"
import AxiosClient from "."

const url = "/setting"

export const fetchConfigData = () => {
  return AxiosClient.get(`${url}`).then((res) => {
    return res.data
  })
}

export const updateEmailSetting = (data: IEmailSetting) => {
  return AxiosClient.put(`${url}/email-setting`, data).then((res) => {
    return res.data
  })
}

export const updateKomu = (data: IKomu) => {
  return AxiosClient.put(`${url}/komu-setting`, data).then((res) => {
    return res.data
  })
}
