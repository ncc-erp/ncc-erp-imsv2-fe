import { commentApi, newsApi } from "@/api"
import { PriorityValues, StatusType } from "@/enums/news"
import {
  ICategories,
  IComment,
  ICommentReq,
  ILikeCommentReq,
  INewsDetail,
  INewsRes,
  INewsStore,
  INewsUpdate,
  INewsValues,
  IQuickNewsRes,
  ITableData,
  IUpdateCommentReq
} from "@/types"
import { IRequestParams, SORT_ENUM } from "@/types/common"
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction
} from "@reduxjs/toolkit"
import { withParamsToastCatcher } from "@/store/ToastCatcher"
import toast from "@/utils/toast"
import { priorityList } from "@/features/News/components"

export const getNews = createAsyncThunk(
  "news/getNews",
  async (params: IRequestParams) => {
    const {
      page = 1,
      size = 1000,
      order = SORT_ENUM.DESC,
      orderBy = "publishedTime",
      mainCategory,
      search,
      subCategoryId
    } = params
    const res = await newsApi.getNews({
      page,
      size,
      order,
      orderBy,
      mainCategory,
      search,
      subCategoryId
    })
    return {hasNextPage:res.hasNextPage,newList:res.data}
  }
)

export const getNewsLatest = createAsyncThunk(
  "news/getNewsLatest",
  async () => {
    const res = await newsApi.getNewsLatest()
    return res
  }
)

export const getPolicyInformations = createAsyncThunk(
  "news/getPolicyInformations",
  async () => {
    const res = await newsApi.getPolicyInformations()
    return res
  }
)

export const getEventInformations = createAsyncThunk(
  "news/getEventInformations",
  async () => {
    const res = await newsApi.getEventInformations()
    return res
  }
)

export const getGuidelineInformations = createAsyncThunk(
  "news/getGuidelineInformations",
  async () => {
    const res = await newsApi.getGuidelineInformations()
    return res
  }
)

export const getNewsInformations = createAsyncThunk(
  "news/getNewsInformations",
  async () => {
    const res = await newsApi.getNewsInformations()
    return res
  }
)

export const saveSubmitODraftNews = createAsyncThunk(
  "news/createSubmitOrDraft",
  async (news: INewsValues) => {
    try {
      const message: string = news.submit
        ? "Save and submit news successfully"
        : "Save news draft successfully"

      await newsApi.createAndDraftOrSubmit(news)
      toast.success(message)
    } catch (err: any) {
      toast.error(err.detail.message)
    }
  }
)

export const savePublishNews = createAsyncThunk(
  "news/save-publish",
  withParamsToastCatcher(async (news: INewsValues) => {
    await newsApi.createAndPublish(news)
  }, "Save and publish news successfully")
)

export const publishNews = createAsyncThunk(
  "news/publish",
  withParamsToastCatcher(async ({ id, isNotify }: { id: number, isNotify: boolean }) => {
    await newsApi.publish(id, isNotify)
  }, "Publish news successfully")
)

export const rejectNews = createAsyncThunk(
  "news/reject",
  withParamsToastCatcher(async (id: number) => {
    await newsApi.reject(id)
  }, "Reject news successfully")
)

export const unpublishNews = createAsyncThunk(
  "news/unpublish",
  withParamsToastCatcher(async (id: number) => {
    await newsApi.unpublish(id)
  }, "Unpublish news successfully")
)

export const updateNews = createAsyncThunk(
  "news/update",
  async (news: INewsUpdate) => {
    if (news.id === undefined) {
      throw new Error("News id is required")
    } else {
      await newsApi.update(news)
    }
  }
)

export const draftReturnNews = createAsyncThunk(
  "news/draft-return",
  withParamsToastCatcher(async (id: number) => {
    await newsApi.draftReturn(id)
  }, "Return to status draft successfully")
)

export const getTableData = createAsyncThunk(
  "news/tableData",
  async (params: IRequestParams) => {
    const res = await newsApi.getDataTable(params)
    return res
  }
)
export const getCategories = createAsyncThunk("news/Categories", async () => {
  const res = await newsApi.getCategories()
  return res
})
export const getNewsDetailData = createAsyncThunk(
  "news/details",
  async (id: number) => {
    const res = await newsApi.getNewsDetail(id)
    return res
  }
)
export const updateLikePost = createAsyncThunk(
  "news/updateLikePost",
  async (data: ILikeCommentReq) => {
    const res = await newsApi.updateLike(data)
    return res
  }
)

export const getCommentsById = createAsyncThunk(
  "comment/getCommentsById",
  async (id: number) => {
    const res = await commentApi.getCommentsById(id)
    return res
  }
)

export const getCommentsByNewsId = createAsyncThunk(
  "comment/getCommentsByNewsId",
  async (id: number) => {
    const res = await commentApi.getCommentsByNewsId(id)
    return res
  }
)

export const createComment = createAsyncThunk(
  "news/createComment",
  async (comment: ICommentReq) => {
    const res = await commentApi.createComment(comment)
    return res
  }
)

export const updateComment = createAsyncThunk(
  "news/updateComment",
  async (data: IUpdateCommentReq) => {
    const res = await commentApi.updateComment(data)
    return res
  }
)

export const deleteComment = createAsyncThunk(
  "news/deleteComment",
  async (id: number) => {
    const res = await commentApi.deleteComment(id)
    return res
  }
)

export const updateLikeComment = createAsyncThunk(
  "news/updateLike",
  async (data: ILikeCommentReq) => {
    const res = await commentApi.updateLike(data)
    return res
  }
)

export const getListQuickNews = createAsyncThunk(
  "news/getListQuickNews",
  async (params?: IRequestParams) => {
    const result = await newsApi.getListQuickNews(params)
    return result
  }
)

export const getAdminNewsDetail = createAsyncThunk(
  "news/getAdminNewsDetail",
  async (id: number) => {
    const result = await newsApi.getAdminNewsDetail(id)
    return result
  }
)

export const extraReducers = (
  builders: ActionReducerMapBuilder<INewsStore>
) => {
  builders.addCase(
    getNews.fulfilled,
    (state: INewsStore, action: PayloadAction<{hasNextPage:boolean,newList:INewsRes[]}>) => {
      state.newsList = [...state.newsList, ...action.payload.newList] as INewsRes[]
      state.hasNextPage = action.payload.hasNextPage
    }
  )
  builders.addCase(
    getNewsLatest.fulfilled,
    (state: INewsStore, action: PayloadAction<INewsRes[]>) => {
      state.newsLatestList = action.payload
    }
  )
  builders.addCase(
    getPolicyInformations.fulfilled,
    (state: INewsStore, action: PayloadAction<{ data: INewsRes[] }>) => {
      state.policyInformations = action.payload.data
    }
  )
  builders.addCase(
    getEventInformations.fulfilled,
    (state: INewsStore, action: PayloadAction<{ data: INewsRes[] }>) => {
      state.eventInformations = action.payload.data
    }
  )
  builders.addCase(
    getGuidelineInformations.fulfilled,
    (state: INewsStore, action: PayloadAction<{ data: INewsRes[] }>) => {
      state.guidelineInformations = action.payload.data
    }
  )
  builders.addCase(
    getNewsInformations.fulfilled,
    (state: INewsStore, action: PayloadAction<{ data: INewsRes[] }>) => {
      state.newsInformations = action.payload.data
    }
  )
  builders.addCase(
    getTableData.fulfilled,
    (state: INewsStore, action: PayloadAction<ITableData>) => {
      state.newsList = [...(action.payload?.data as INewsRes[])]
      state.tableData = action.payload
    }
  )
  builders.addCase(
    getCategories.fulfilled,
    (state: INewsStore, action: PayloadAction<ICategories>) => {
      state.mainCategories = [...action.payload.mainCategories]
      state.subCategories = [...action.payload.subCategories]
    }
  )

  builders.addCase(
    getNewsDetailData.fulfilled,
    (state: INewsStore, action: PayloadAction<INewsDetail>) => {
      state.detailData = action.payload
    }
  )
  builders.addCase(
    getCommentsById.fulfilled,
    (state: INewsStore, action: PayloadAction<IComment[]>) => {
      state.detailCommentList = [...action.payload]
    }
  )
  builders.addCase(
    getListQuickNews.fulfilled,
    (state: INewsStore, action: PayloadAction<{ data: IQuickNewsRes[] }>) => {
      state.quickNewsList = action.payload.data
    }
  )

  builders.addCase(
    getCommentsByNewsId.fulfilled,
    (state: INewsStore, action: PayloadAction<IComment[]>) => {
      state.detailCommentList = action.payload
    }
  )
  builders.addCase(
    unpublishNews.fulfilled,
    (state: INewsStore) => {
      state.newsUpdate.status = StatusType.HIDDEN
    }
  )
  builders.addCase(
    publishNews.fulfilled,
    (state: INewsStore) => {
      state.newsUpdate.status = StatusType.APPROVED
    }
  )
  builders.addCase(
    draftReturnNews.fulfilled,
    (state: INewsStore) => {
      state.newsUpdate.status = StatusType.DRAFT
    }
  )
  builders.addCase(saveSubmitODraftNews.fulfilled, (state: INewsStore,
    action: PayloadAction<void, string,
    { arg: INewsValues }>) => {
    // save + submit || save draft 
    state.newsUpdate.status = action.meta.arg.submit
      ? StatusType.WAITING
      : StatusType.DRAFT;
  })
  builders.addCase(rejectNews.fulfilled, (state: INewsStore) => {
    state.newsUpdate.status = StatusType.DRAFT
  })
  builders.addCase(savePublishNews.fulfilled, (state: INewsStore) => {
    state.newsUpdate.status = StatusType.APPROVED
  })
  builders.addCase(
    getAdminNewsDetail.fulfilled,
    (state: INewsStore, action: PayloadAction<INewsValues>) => {
      const values = action.payload as Partial<INewsValues>
      const priority = priorityList.find(i => i.id === values.priority)
      state.newsUpdate = {
        ...values,
        priority: priority ? priority.value : PriorityValues.LOW
      }
    }
  )
}
