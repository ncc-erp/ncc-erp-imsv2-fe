import { stringToBoolean } from "@/utils"
import { createSelector } from "@reduxjs/toolkit"
import { AppState } from ".."

const getConfigData = (state: AppState) => state.config.configData

export const sConfigEmail = createSelector(getConfigData, (state) => {
  return {
    ...state.email,
    enableSsl: stringToBoolean(state?.email?.enableSsl)
  }
})

export const sConfigKomu = createSelector(getConfigData, (state) => {
  const komu = state?.komu
  return {
    enableAllowCheckInIMSForAll: stringToBoolean(
      komu?.enableAllowCheckInIMSForAll
    ),
    enableToNoticeKomu: stringToBoolean(komu?.enableToNoticeKomu)
  }
})
