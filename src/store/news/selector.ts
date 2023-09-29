import { IComment, IMainCategories, NEWS_CATEGORY } from "@/types"
import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "@/store"
import { DEFAULT_ALL, ISelectData } from "@/types/common"

const getTableData = (state: AppState) => state.news.tableData
export const sTableData = createSelector(getTableData, (state) => state)

const getDetailData = (state: AppState) => state.news.detailData
export const sDetailData = createSelector(getDetailData, (state) => state)
const getMainCategories = (state: AppState) => state.news.mainCategories
export const sMainCategories = createSelector(
  getMainCategories,
  (state): IMainCategories[] => [
    {
      id: NEWS_CATEGORY.ALL,
      label: NEWS_CATEGORY.ALL
    },
    ...state
  ]
)
const getSubCategories = (state: AppState) => state.news.subCategories
export const sSubCategories = createSelector(getSubCategories, (state) => [
  {
    id: DEFAULT_ALL,
    displayName: "All"
  },
  ...state
])

const getCommentList = (state: AppState): IComment[] =>
  state.news.detailCommentList.map((comment) => ({
    ...comment,
    reply: []
  }))

export const sCommentList = createSelector(getCommentList, (state) => {
  return state.reduce((previousValue: IComment[], currentValue: IComment) => {
    if (!currentValue?.parentCommentId) return [...previousValue, currentValue]
    const parentComment = state.find(
      (value) => value?.id === currentValue?.parentCommentId
    )
    parentComment?.reply?.push(currentValue)
    return previousValue
  }, [])
})
export const sMainCategoryOpt = createSelector(
  getMainCategories,
  (state): ISelectData[] =>
    state.map((main) => ({
      id: main?.id || "",
      name: main?.label || "",
      value: main?.id || ""
    }))
)

export const sSubCategoryOpt = createSelector(getSubCategories, (state) =>
  state.map((sub) => ({
    id: sub?.id.toString() || "",
    name: sub?.displayName || "",
    value: sub?.displayName || "",
    entityName: sub?.entityName || ""
  }))
)

export const sSubCategoryId = createSelector(
  (state: AppState) => state.news.subCategoryId,
  (state) => state
)
