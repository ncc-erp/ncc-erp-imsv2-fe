import adminApi from "./apiAdmin"
import newsApi from "./apiNews"
import userApi from "./apiUser"
import widgetApi from "./apiWidget"
import configApi from "./apiConfig"
export const handlers = [
  ...userApi,
  ...newsApi,
  ...widgetApi,
  ...adminApi,
  ...configApi,
]
