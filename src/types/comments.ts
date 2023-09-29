export interface IComment {
  comment: string
  likesCount: number
  createdTime: string
  id: number
  parentCommentId: number
  newsId: number
  hasCurrentUserLiked: boolean
  reply?: IComment[]
  user: {
    avatar: string
    userId: string
    name: string
    userName: string
  }
}

export interface ICommentReq {
  comment: string
  parentCommentId: number | null
  newsId: number
}

export interface IUpdateCommentReq {
  id: number
  comment: string
}

export interface ILikeCommentReq {
  id: number
  liked: boolean
}
