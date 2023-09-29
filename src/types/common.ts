import { NEWS_CATEGORY, NEWS_STATUS } from "@/types/news"
import { IPaginationParams } from "./pagination"

export interface IFulfilledAction<ThunkArg, PromiseResult> {
  type: string
  payload: PromiseResult
  meta: {
    requestId: string
    arg: ThunkArg
  }
}

export interface IRequestParams {
  page?: number
  size?: number
  order?: SORT_ENUM
  orderBy?: string
  search?: string
  mainCategory?: NEWS_CATEGORY
  entityName?: NEWS_CATEGORY
  subCategoryId?: number
  status?: NEWS_STATUS
  isActive?: boolean
}

export interface IActionButtonProps {
  onEdit: () => void,
  onDelete: () => void
}

export interface IUserRequestParams extends IPaginationParams {
  role?: number
}

export enum SORT_ENUM {
  asc = "asc",
  desc = "desc",
  ASC = "ASC",
  DESC = "DESC"
}

export interface ISelectData {
  id: string | number
  name: string
  value: string
}

export const DEFAULT_ALL = 0

export interface ICommonStore {
  selfie: ISelfieRes
}

export interface ISelfieRes {
  firstName: string
  lastName: string
  imageVerifyId: string
  showMessage: boolean
}

export interface IToastError {
  detail: {
    statusCode: number
    message: string
    error: string
  }
}

export enum TOAST_TYPE {
  SUCCESS = 1,
  FAIL = 2
}
