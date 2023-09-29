import {
  TimesheetIcon,
  DevOpsIcon,
  NccSoftLogo
} from "@/assets"

export enum ColumnWidgetId {
  TITLE = "title",
  CODE = "code",
  ACTIVE = "active",
  DESCRIPTION = "description",
  DEFAULT_HEIGHT = "defaultHeight",
  DEFAULT_WIDTH = "defaultWidth",
  THUMBNAIL_IMAGE = "thumbnailImage",
  MAX_HEIGHT = "maxHeight",
  MAX_WIDTH = "maxWidth"
}

export const WidgetLinksItems = [
  {
    id: 0,
    img: { src: TimesheetIcon, alt: "Timesheet" },
    link: "https://timesheet.nccsoft.vn/"
  },
  {
    id: 1,
    img: { src: DevOpsIcon, alt: "DevOps" },
    link: "https://ops.nccsoft.vn/"
  },
  {
    id: 2,
    img: { src: NccSoftLogo, alt: "W2" },
    link: "https://w2.nccsoft.vn/"
  },
  {
    id: 3,
    img: { src: NccSoftLogo, alt: "AMS" },
    link: "http://ams.nccsoft.vn/users"
  }
]

export enum SELECT {
  MAX_HEIGHT = 350
} 
export enum CAROUSEL {
  SPEED = 1000,
  DEPLAY = 1000
}
