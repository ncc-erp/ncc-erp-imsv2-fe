import { ColumnWidgetId } from "@/enums/widget"

export interface IWidgetLayout {
  width: number
  height: number
  x: number
  y: number
  id: string
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
}

export interface IWidgetRes {
  id: number
  title: string
  description: string
  thumbnailImage: string
  defaultWidth: number
  defaultHeight: number
  maxWidth?: number
  maxHeight?: number
  code?: WIDGET_TYPE
  entityTypeId?: number
  isEnabled?: boolean
  url?: string
}

export type IWidgetInfo = Omit<IWidgetRes, "id">

export enum WIDGET_TYPE {
  CHECK_IN = 1,
  NEWS = 2,
  QUICK_NEWS = 3,
  USER_PROFILE = 4,
  FACE = 5,
  PENALTY_FUND = 6,
  TASKS_FOR_TODAY = 9,
  VIOLATION_LIST = 8,
  TOP_UNLOCK = 11,
  TRADITIONAL_ROOM = 13,
  TOTAL_UNLOCK_TIMESHEET = 12,
  NEWS_INFORMATIONS = 17,
  EVENT_INFORMATIONS = 18,
  GUIDELINE_INFORMATIONS = 19,
  POLICY_INFORMATIONS = 20,
  LINKS = 16
}

export enum WIDGET_URL {
  CHECK_IN = "",
  NEWS = "/information",
  NEWS_INFORMATIONS = "/information/news",
  EVENT_INFORMATIONS = "/information/events",
  GUIDELINE_INFORMATIONS = "/information/guidelines",
  POLICY_INFORMATIONS = "/information/policies",
  VIOLATION_LIST = "/violations",
  TRADITIONAL_ROOM = "/traditional-room"
}

export const WidgetURL = new Map([
  [WIDGET_TYPE.CHECK_IN, WIDGET_URL.CHECK_IN],
  [WIDGET_TYPE.NEWS, WIDGET_URL.NEWS],
  [WIDGET_TYPE.VIOLATION_LIST, WIDGET_URL.VIOLATION_LIST],
  [WIDGET_TYPE.TRADITIONAL_ROOM, WIDGET_URL.TRADITIONAL_ROOM],
  [WIDGET_TYPE.NEWS_INFORMATIONS, WIDGET_URL.NEWS_INFORMATIONS],
  [WIDGET_TYPE.EVENT_INFORMATIONS, WIDGET_URL.EVENT_INFORMATIONS],
  [WIDGET_TYPE.GUIDELINE_INFORMATIONS, WIDGET_URL.GUIDELINE_INFORMATIONS],
  [WIDGET_TYPE.POLICY_INFORMATIONS, WIDGET_URL.POLICY_INFORMATIONS],
])

export interface ISubmitWidgetsPayload {
  id?: number
  widgetId?: number
  widgetCode: number
  maxHeight?: number
  maxWidth?: number
  thumbnailImage?: string
  url?: string
  title: string
  height: number
  width: number
  posX: number
  posY: number
}

export interface IWidgetColumn {
  id:
    | ColumnWidgetId.TITLE
    | ColumnWidgetId.THUMBNAIL_IMAGE
    | ColumnWidgetId.DESCRIPTION
    | ColumnWidgetId.CODE
    | ColumnWidgetId.DEFAULT_HEIGHT
    | ColumnWidgetId.DEFAULT_WIDTH
    | ColumnWidgetId.MAX_HEIGHT
    | ColumnWidgetId.MAX_WIDTH
    | ColumnWidgetId.ACTIVE

  label: string
}

export interface IWidgetForm extends Omit<IWidgetRes, "thumbnailImage"> {
  thumbnailImageFile?: File
  thumbnailImage?: string
}

export interface IWidgetLinkItem {
  id?: number,
  img: {
    src: string,
    alt: string
  },
  link: string
}
