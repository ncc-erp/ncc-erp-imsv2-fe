import AxiosClient from "."

const url = "/time-sheet"

export const getTopUserUnlock = async () => {
  const res = await AxiosClient.get(url + "/unlock/top-user")
  return res.data
}

export const postUnlockLogTimesheet = async () => {
  const res = await AxiosClient.post(url + "/unlock/log-timesheet")
  return res.data
}

export const postUnlockApproveTimeSheet = async () => {
  const res = await AxiosClient.post(url + "/unlock/approve-timesheet")
  return res.data
}

export const getLockedTimesheets = async () => {
  const res = await AxiosClient.get(url + "/locked-timesheets")
  return res.data
}