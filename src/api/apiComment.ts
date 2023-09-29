import { ICommentReq, IUpdateCommentReq, ILikeCommentReq } from "@/types"
import AxiosClient from "@/api"

const url = "/comment"

export const getCommentsById = (id: number) => {
  return AxiosClient.get(`${url}/${id}`).then((res) => res.data)
}

export const getCommentsByNewsId = (id: number) => {
  return AxiosClient.get(`${url}?newsId=${id}`).then((res) => res.data)
}

export const createComment = (data: ICommentReq) => {
  return AxiosClient.post(`${url}`, data).then((res) => res.data)
}

export const updateComment = (data: IUpdateCommentReq) => {
  return AxiosClient.put(`${url}/${data.id}`, {
    comment: data.comment
  }).then((res) => res.data)
}

export const deleteComment = (id: number) => {
  return AxiosClient.delete(`${url}/${id}`).then((res) => res.data)
}

export const updateLike = (data: ILikeCommentReq) => {
  return AxiosClient.post(`${url}/like/${data.id}?liked=${data.liked}`).then(
    (res) => res.data
  )
}
