import { newsFormValues } from "@/api/__mocks__/data/news"
import { PriorityValues } from "@/enums/news"
import {
  IComment,
  INewsRes,
  INewsStore,
  INewsUpdate,
  IPriorityIdValue,
  RowData
} from "@/types"
import { current, PayloadAction } from "@reduxjs/toolkit"

const handleConvertValuePriority = (value: string) => {
  if (!value) return PriorityValues.LOW

  const priority: IPriorityIdValue = {
    "1": PriorityValues.IMPORTANT,
    "2": PriorityValues.HIGH,
    "3": PriorityValues.LOW
  }

  return priority[value]
}

export const newsReducer = {
  setNewsUpdate: (state: INewsStore, action: PayloadAction<INewsUpdate>) => {
    const news = action.payload
    if (news.priority) {
      const newPriority = handleConvertValuePriority(news.priority.toString())
      state.newsUpdate = { ...news, priority: newPriority }
    }
  },
  resetNewsUpdate: (state: INewsStore) => {
    state.newsUpdate = newsFormValues
  },
  addNewsLatest: (state: INewsStore, action: PayloadAction<RowData>) => {
    const newsList = current(state.newsList)
    const news = newsList.find((x) => x.id === action.payload.id)
    if (news) {
      state.newsLatestList.push(news)
    }
  },
  updateLikeNewsLatest: (state: INewsStore, action: PayloadAction<number>) => {
    const index = action.payload
    if (index !== -1) {
      state.newsLatestList[index] = {
        ...state.newsLatestList[index],
        hasCurrentUserLiked: !state.newsLatestList[index].hasCurrentUserLiked,
        countLike: state.newsLatestList[index].hasCurrentUserLiked
          ? state.newsLatestList[index].countLike - 1
          : state.newsLatestList[index].countLike + 1
      }
    }
  },

  updateLikeEventInformations: (state: INewsStore, action: PayloadAction<number>) => {
    const index = action.payload
    if (index !== -1) {
      state.eventInformations[index] = {
        ...state.eventInformations[index],
        hasCurrentUserLiked: !state.eventInformations[index].hasCurrentUserLiked,
        countLike: state.eventInformations[index].hasCurrentUserLiked
          ? state.eventInformations[index].countLike - 1
          : state.eventInformations[index].countLike + 1
      }
    }
  },

  updateLikePolicyInformations: (state: INewsStore, action: PayloadAction<number>) => {
    const index = action.payload
    if (index !== -1) {
      state.policyInformations[index] = {
        ...state.policyInformations[index],
        hasCurrentUserLiked: !state.policyInformations[index].hasCurrentUserLiked,
        countLike: state.policyInformations[index].hasCurrentUserLiked
          ? state.policyInformations[index].countLike - 1
          : state.policyInformations[index].countLike + 1
      }
    }
  },

  updateLikeGuidelineInformations: (state: INewsStore, action: PayloadAction<number>) => {
    const index = action.payload
    if (index !== -1) {
      state.guidelineInformations[index] = {
        ...state.guidelineInformations[index],
        hasCurrentUserLiked: !state.guidelineInformations[index].hasCurrentUserLiked,
        countLike: state.guidelineInformations[index].hasCurrentUserLiked
          ? state.guidelineInformations[index].countLike - 1
          : state.guidelineInformations[index].countLike + 1
      }
    }
  },

  updateLikeNewsInformations: (state: INewsStore, action: PayloadAction<number>) => {
    const index = action.payload
    if (index !== -1) {
      state.newsInformations[index] = {
        ...state.newsInformations[index],
        hasCurrentUserLiked: !state.newsInformations[index].hasCurrentUserLiked,
        countLike: state.newsInformations[index].hasCurrentUserLiked
          ? state.newsInformations[index].countLike - 1
          : state.newsInformations[index].countLike + 1
      }
    }
  },


  deleteNewsLatest: (state: INewsStore, action: PayloadAction<INewsRes>) => {
    const newNewsList: INewsRes[] = state.newsLatestList
    const index = newNewsList.findIndex(
      (news: INewsRes) => +news.id === +action.payload.id
    )

    if (index > -1) {
      newNewsList.splice(index, 1)
      state.newsLatestList = newNewsList
    }
  },

  setSubCategoryId: (state: INewsStore, action: PayloadAction<number>) => {
    state.subCategoryId = action.payload
  }
}
