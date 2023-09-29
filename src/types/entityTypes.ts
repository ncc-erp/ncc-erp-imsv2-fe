import { ColumnId } from "@/enums/entityTypes"
import { SORT_ENUM } from "./common"
import { NEWS_CATEGORY } from "./news"
import { MuiColorInputValue } from "mui-color-input"

export interface ColumnEntityData {
  id: ColumnId.MAINCATEGORIES | ColumnId.SUBCATEGORIES
  label: string
  minWidth?: number
  width?: number | string
  align?: "center" | "left" | "right"
  format?: (value: number) => string
}
export type IOrderTableEntity = SORT_ENUM.ASC | SORT_ENUM.DESC
export type IOrderByTableEntity =
  | ColumnId.MAINCATEGORIES
  | ColumnId.SUBCATEGORIES
export interface IReqOrderEntity {
  direction: SORT_ENUM
  property: IOrderByTableEntity
}
export interface RowEntityData {
  id: number
  entityName?: NEWS_CATEGORY
  displayName: string
  color: MuiColorInputValue
}
export interface ITableEntityData {
  data: DataEntityTypesForm[]
  itemCount: number
  pageCount: number
  page: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  size: number
}
export interface IEntityTypesStore {
  tableEntityData: ITableEntityData
  entityTypeData: DataEntityTypesForm
}
export interface DataEntityTypesForm {
  id?: number
  entityName: NEWS_CATEGORY
  displayName: string
  color: MuiColorInputValue
  isActive: boolean
}
