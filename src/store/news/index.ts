import { newsFormValues } from "@/api/__mocks__/data/news"
import { newsReducer } from "@/store/news/reducer"
import { extraReducers } from "@/store/news/thunkApi"
import { DEFAULT_ALL, INewsStore } from "@/types"
import { createSlice } from "@reduxjs/toolkit"

export const initialState: INewsStore = {
  dashboardData: [],
  detailData: {
    id: 0,
    thumbnailImage: "",
    title: "",
    publishedTime: new Date(),
    nameAuthor: "",
    avatarAuthor: "",
    sapo: "",
    description: "",
    mainCategory: "",
    subCategory: "",
    effectiveStartTime: null,
    effectiveEndTime: null,
    recommended: [],
    relationNews: [],
    hasCurrentUserLiked: false,
    countLike: 0,
    countComment: 0
  },
  newsUpdate: newsFormValues,
  newsList: [],
  newsLatestList: [],
  policyInformations: [],
  newsInformations: [],
  guidelineInformations: [],
  eventInformations: [],
  tableData: {
    data: [],
    itemCount: 0,
    pageCount: 0,
    page: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    size: 0
  },
  detailCommentList: [],
  mainCategories: [],
  subCategories: [],
  quickNewsList: [],
  hasNextPage: true,
  subCategoryId: DEFAULT_ALL,
}
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: newsReducer,
  extraReducers: extraReducers
})

export const {
  addNewsLatest,
  deleteNewsLatest,
  setNewsUpdate,
  resetNewsUpdate,
  updateLikeNewsLatest,
  updateLikeEventInformations,
  updateLikeGuidelineInformations,
  updateLikeNewsInformations,
  updateLikePolicyInformations,
  setSubCategoryId
} = newsSlice.actions

export default newsSlice.reducer
