import { DEFAULT_ALL } from "@/types"

export enum ColumnId {
  ORIDINALNUM = "ordinalNum",
  TITLE = "title",
  STATUS = "status",
  THUMNAIL = "thumImage",
  CREATED = "createdTime",
  PUBLISHED = "publishedTime"
}

export enum MainCategoriesId {
  NEWS = "News",
  EVENTS = "Events",
  POLICIES = "Policies",
  GUIDELINES = "Guidelines"
}
export enum MainCategoriesLabel {
  NEWS = "Tin tức",
  EVENTS = "Sự kiện",
  POLICIES = "Quy định",
  GUIDELINES = "Hướng dẫn"
}

export enum StatusType {
  DRAFT = 1000,
  WAITING = 2000,
  RETURN = 3000,
  APPROVED = 4000,
  HIDDEN = 5000,
  DISABLE = 6000
}
export const status: { [key in StatusType]?: string } = {
  [StatusType.DRAFT]: "Draft",
  [StatusType.WAITING]: "Waiting",
  [StatusType.APPROVED]: "Published",
  [StatusType.HIDDEN]: "Unpublished"
}
const arrayOfObjectsStatus = Object.entries(status).map(([key, value]) => ({
  id: key,
  value
}))

export const statusOptions = [
  { id: DEFAULT_ALL, value: "All" },
  ...arrayOfObjectsStatus
]

export enum PriorityValues {
  IMPORTANT = "Important",
  HIGH = "High",
  LOW = "Low"
}

export enum Align {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical"
}

export enum LabelButton {
  SAVE_PUBLISH = "Save & Publish",
  SAVE_SUBMIT = "Save & Submit",
  SAVE_DRAFT = "Save Draft",
  PUBLISH = "Publish",
  RETURN = "Return",
  UNPUBLISH = "Unpublish",
  REJECT = "Reject",
  PREVIEW = "Preview News"
}

export enum EInformationLabel {
  news = "Tin tức",
  events = "Sự kiện",
  guidelines = "Hướng dẫn",
  policies = "Quy định"
}
