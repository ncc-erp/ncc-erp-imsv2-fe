import {
  ColumnId,
  LabelButton,
  MainCategoriesId,
  MainCategoriesLabel,
  StatusType
} from "@/enums/news"
import { IComment, SORT_ENUM } from "@/types"

export interface INewsRes {
  id: number
  title: string
  sapo: string
  description: string
  createdTime: string
  entityTypeId: number
  status: number
  priority: number
  thumbnailImage: string
  effectiveStartTime: string
  effectiveEndTime: string
  publishedTime: Date
  mainCategory: string
  subCategory: string
  subCategoryColor: string
  countComment: number
  countLike: number
  hasCurrentUserLiked: boolean
}
export interface INewsInfo {
  thumbnailImage: string
  title: string
  sapo: string
  description: string
}

export interface INewsId {
  id: number
}

export type INews = INewsInfo & INewsId

export interface INewsForm {
  id?: number
  thumbnailImageFile?: File
  thumbnailImage?: string
  title?: string
  sapo?: string
  description?: string
  status?: StatusType
  mainCategory?: string
  subCategory?: string
  priority?: string
  publishedTime: Date
  effectiveStartTime?: Date | null
  effectiveEndTime?: Date | null
  isNotify?: boolean
  relationNews?: INewsRes[]
}

export type INameNewsForm =
  | "title"
  | "id"
  | "thumbnailImage"
  | "sapo"
  | "description"

export type INewsValues = INewsForm & {
  relationNewsIds?: string[] | string
  teamIds?: string[] | string
  submit?: boolean
}

export type INewsUpdate = Partial<INewsValues>

export interface INewsDashboardItem {
  id: number
  thumbnailImage: string
  title: string
  publishedTime: Date
  nameAuthor: string
  avatarAuthor: string
  countLike: number
  countComment: number
  categoryColor: string
  categoryName: string
}
export interface INewsDetail {
  id: number
  thumbnailImage: string
  title: string
  publishedTime: Date
  nameAuthor: string
  avatarAuthor: string
  sapo: string
  description: string
  mainCategory: string
  subCategory: string
  effectiveStartTime: Date | null
  effectiveEndTime: Date | null
  recommended: INewsDashboardItem[]
  relationNews: INewsDashboardItem[]
  hasCurrentUserLiked: boolean
  countLike: number
  countComment: number
}

export interface ITableData {
  data: RowData[] | INewsRes[]
  itemCount: number
  pageCount: number
  page: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  size: number
}
export interface RowData {
  id: number
  ordinalNum: number
  title: string
  status: number
  thumbnailImage: string
  createdTime: Date
  publishedTime: Date
}

export interface ColumnData {
  id:
    | ColumnId.ORIDINALNUM
    | ColumnId.CREATED
    | ColumnId.PUBLISHED
    | ColumnId.TITLE
    | ColumnId.STATUS

  label: string
  minWidth?: number
  align?: "center" | "left" | "right"
  format?: (value: number) => string
}
export interface IMainCategories {
  id:
    | MainCategoriesId.EVENTS
    | MainCategoriesId.GUIDELINES
    | MainCategoriesId.NEWS
    | MainCategoriesId.POLICIES
    | NEWS_CATEGORY.ALL
  label:
    | MainCategoriesLabel.EVENTS
    | MainCategoriesLabel.GUIDELINES
    | MainCategoriesLabel.NEWS
    | MainCategoriesLabel.POLICIES
    | NEWS_CATEGORY.ALL
}
export interface ISubCategories {
  id: number
  entityName?:
    | NEWS_CATEGORY.EVENTS
    | NEWS_CATEGORY.GUIDELINES
    | NEWS_CATEGORY.NEWS
    | NEWS_CATEGORY.POLICIES
  displayName: string
  color?: string
}
export interface ICategories {
  mainCategories: IMainCategories[]
  subCategories: ISubCategories[]
}
export interface INewsStore {
  dashboardData: INewsDashboardItem[]
  detailData: INewsDetail
  newsUpdate: INewsUpdate
  newsList: INewsRes[]
  newsLatestList: INewsRes[]
  tableData: ITableData
  detailCommentList: IComment[]
  mainCategories: IMainCategories[]
  subCategories: ISubCategories[]
  quickNewsList: IQuickNewsRes[]
  policyInformations: INewsRes[],
  eventInformations: INewsRes[],
  guidelineInformations: INewsRes[],
  newsInformations: INewsRes[]
  hasNextPage: boolean,
  subCategoryId: number
}

export type IOrderTable = SORT_ENUM.ASC | SORT_ENUM.DESC
export type IOrderByTable =
  | ColumnId.ORIDINALNUM
  | ColumnId.CREATED
  | ColumnId.PUBLISHED
  | ColumnId.TITLE
  | ColumnId.STATUS
export interface IReqOrder {
  direction: SORT_ENUM
  property: IOrderByTable
}
export type IMainCategoryTable =
  | MainCategoriesLabel.EVENTS
  | MainCategoriesLabel.GUIDELINES
  | MainCategoriesLabel.NEWS
  | MainCategoriesLabel.POLICIES
export type IStatusTable =
  | StatusType.APPROVED
  | StatusType.DISABLE
  | StatusType.DRAFT
  | StatusType.HIDDEN
  | StatusType.RETURN
  | StatusType.WAITING
export interface IReqFilter {
  mainCategory?: NEWS_CATEGORY
  subCategory?: number
  status?: NEWS_STATUS
}

export enum NEWS_CATEGORY {
  ALL = "All",
  NEWS = "News",
  EVENTS = "Events",
  GUIDELINES = "Guidelines",
  POLICIES = "Policies",
  WIDGETS = "Widgets",
  TRADITION_ALBUMS = "TraditionAlbums"
}

export const NEWS_CATEGORY_ARRAY = Object.values(NEWS_CATEGORY);

export enum NEWS_STATUS {
  Draft = 1000,
  Waiting = 2000,
  Return = 3000,
  Approved = 4000,
  Hidden = 5000,
  Disabled = 6000
}

export interface IQuickNewsRes {
  id: number
  createdTime: string
  content: string
  hover: string
}

export interface IPriorityIdValue {
  [key: string]: string
}

export type ILabelButton =
  | LabelButton.SAVE_DRAFT
  | LabelButton.SAVE_PUBLISH
  | LabelButton.SAVE_SUBMIT
  | LabelButton.PUBLISH
  | LabelButton.UNPUBLISH
  | LabelButton.REJECT
  | LabelButton.RETURN
  | LabelButton.PREVIEW
