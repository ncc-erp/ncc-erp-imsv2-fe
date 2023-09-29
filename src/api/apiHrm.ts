import { IFundAmountHistoriesRequestParam } from "@/types"
import AxiosClient from "."

const url = "/hrmv2"

export const getFundCurrentBalance = () => (
  AxiosClient.get(`${url}/fund-current-balance`).then((res) => {
    return res.data
  })
)

export const getFundAmountHistories = (params: IFundAmountHistoriesRequestParam) => {
  return AxiosClient.get(`${url}/fund-amount-histories`, { params }).then((res) => {
    return res.data
  })
}

export const getUserInfo = (email: string) => {
  const params = { email }
  return AxiosClient.get(`${url}/user-info`, { params }).then((res) => {
    return res.data
  })
}
