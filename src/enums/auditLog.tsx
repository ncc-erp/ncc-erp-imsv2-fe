import { REQUEST_METHOD } from "./httpRequest"

export const AUDIT_LOG_TABLE_COLUMNS = [
  { title: "#", width: "50px", isSortAble: false },
  { title: "Email", isSortAble: false },
  { title: "Method", width: '85px', isSortAble: false },
  { title: "Parameters", isSortAble: false },
  { title: "Endpoint", isSortAble: false },
  { title: "Status", width: "80px", isSortAble: false },
  { title: "Exception", isSortAble: false },
  { title: "Execution Time", value: "createdTime", width: "140px", isSortAble: true },
  { title: "Duration(ms)", value: "executionTime", width: "100px", isSortAble: true },
]

export enum AUDIT_LOG_SEARCH_CATEGORY {
  CREATEDBY = 'createdBy',
  ENDPOINT = 'endpoint',
  EXCEPTION = 'exception'
} 

export enum MUI_COLORS {
  SUCCESS = "success",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  WARINING = "warning",
  ERROR = "error",
}

export const METHOD_COLOR = [
  { TYPE: REQUEST_METHOD.GET, COLOR: MUI_COLORS.SUCCESS },
  { TYPE: REQUEST_METHOD.POST, COLOR: MUI_COLORS.PRIMARY },
  { TYPE: REQUEST_METHOD.PATCH, COLOR: MUI_COLORS.SECONDARY },
  { TYPE: REQUEST_METHOD.PUT, COLOR: MUI_COLORS.WARINING },
  { TYPE: REQUEST_METHOD.DELETE, COLOR: MUI_COLORS.ERROR },
]

export enum FILTER_TYPE {
  SELECT = 'select',
  DATE_PICKER = 'date_picker'
}