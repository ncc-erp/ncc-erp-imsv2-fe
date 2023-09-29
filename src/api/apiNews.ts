import AxiosClient from "@/api"
import { ILikeCommentReq, INewsUpdate, INewsValues } from "@/types"
import { IRequestParams, SORT_ENUM } from "@/types/common"
import { MainCategoriesId } from "@/enums/news"

const url = "/news"

const getNewsDashboardDefaultParams = {
  order: SORT_ENUM.DESC,
  orderBy: "publishedTime"
}

export const getNews = async (params: IRequestParams) => {
  const {
    page = 1,
    size = 10,
    order = "asc",
    orderBy = "",
    mainCategory,
    search,
    subCategoryId
  } = params
  return AxiosClient.get(`${url}`, {
    params: {
      page,
      size,
      order,
      orderBy,
      mainCategory,
      search,
      subCategoryId
    }
  }).then((res) => {
    return res.data
  })
}

export const getNewsLatest = async () => {
  return AxiosClient.get(`${url}/latest`).then((res) => res.data)
}

export const getPolicyInformations = async () => {
  const params = { 
    ...getNewsDashboardDefaultParams,
    mainCategory: MainCategoriesId.POLICIES
  }
  return AxiosClient.get(`${url}`, { params }).then((res) => res.data)
}

export const getGuidelineInformations = async () => {
  const params = { 
    ...getNewsDashboardDefaultParams,
    mainCategory: MainCategoriesId.GUIDELINES
  }
  return AxiosClient.get(`${url}`, { params }).then((res) => res.data)
}

export const getEventInformations = async () => {
  const params = { 
    ...getNewsDashboardDefaultParams,
    mainCategory: MainCategoriesId.EVENTS
  }
  return AxiosClient.get(`${url}`, { params }).then((res) => res.data)
}

export const getNewsInformations = async () => {
  const params = { 
    ...getNewsDashboardDefaultParams,
    mainCategory: MainCategoriesId.NEWS
  }
  return AxiosClient.get(`${url}`, { params }).then((res) => res.data)
}

export const getDataTable = async (params: IRequestParams) => {
  return AxiosClient.get(`${url}/admin`, { params }).then((res) => {
    return res.data
  })
}
export const getCategories = () => {
  return AxiosClient.get(`${url}/search-filters`).then((res) => res.data)
}

export const getNewsDetail = async (id: number) => {
  return AxiosClient.get(`${url}/details/${id}`).then((res) => {
    return res.data
  })
}

export const getAll = () => {
  return AxiosClient.get(url).then((res) => res.data)
}

export const createAndDraftOrSubmit = ({ submit, ...data }: INewsValues) => {
  return AxiosClient.post(`${url}?submit=${submit}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const createAndPublish = ({ isNotify, ...data }: INewsValues) => {
  return AxiosClient.post(`${url}/save-publish?isNotify=${isNotify}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const submit = (id: number) => {
  return AxiosClient.post(`${url}/submit/${id}`)
}

export const publish = (id: number, isNotify: boolean) => {
  return AxiosClient.post(`${url}/publish/${id}?isNotify=${isNotify}`)
}

export const unpublish = (id: number) => {
  return AxiosClient.post(`${url}/unpublish/${id}`)
}

export const reject = (id: number) => {
  return AxiosClient.post(`${url}/reject/${id}`)
}

export const draftReturn = (id: number) => {
  return AxiosClient.post(`${url}/draft/${id}`)
}

export const update = (data: INewsUpdate) => {
  return AxiosClient.post(`${url}?submit=false`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const remove = (id: number) => {
  return AxiosClient.delete(`${url}?id=${id}`)
}

export const getListQuickNews = (params?: IRequestParams) => {
  return AxiosClient.get(`${url}/quick-news`, { params }).then(
    (res) => res.data
  )
}
export const updateLike = (data: ILikeCommentReq) => {
  return AxiosClient.post(`${url}/like/${data.id}?liked=${data.liked}`).then(
    (res) => res.data
  )
}

export const getAdminNewsDetail = (id: number) => {
  return AxiosClient.get(`${url}/admin/details/${id}`).then(
    (res) => res.data
  )
}
