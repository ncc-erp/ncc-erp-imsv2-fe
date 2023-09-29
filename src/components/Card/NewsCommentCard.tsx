import CommentForm from "@/components/Form/CommentForm"
import { AppDispatch, AppState } from "@/store"
import {
  createComment,
  deleteComment,
  getCommentsByNewsId,
  updateComment,
  updateLikeComment
} from "@/store/news/thunkApi"
import { sGetUserId, sIsAdmin } from "@/store/user/selector"
import {
  IComment,
  ICommentReq,
  IUpdateCommentReq,
  ILikeCommentReq
} from "@/types"
import { shortenText } from "@/utils"
import { timeSince } from "@/utils/time"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { MouseEvent, useMemo, useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import IMSModal from "../Modal/IMSModal"
import { Theme } from "@mui/material/styles"
import { IMSAvatar } from "@/components"

const MAX_STRING = 135

export interface INewsCommentCardProps extends PropsFromStore {
  comment: IComment
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  contentModal: {
    borderBottomWidth: 0
  },
  headerModal: {
    color: theme.palette.error.main
  }
}))

const CommentCardContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.default,
  borderRadius: 0,
  marginBottom: theme.spacing(2.25),
}))

const CommentCardInner = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  columnGap: theme.spacing(1.9),
}))

const CommentCardAvatar = styled(Box)({
  "& > img": {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
  },
})

const CommentCardContentContainer = styled(Box)({
  flex: "1 1 0",
})

const CommentCardContentInner = styled(Box)(({ theme }) => ({
  backgroundColor: "#F2F4F7",
  padding: theme.spacing(1, 2, 2),
  borderRadius: theme.spacing(0.75),
  "& .more-text": {
    display: "inline-block",
    position: "relative",
    fontSize: 12,
    color: theme.palette.primary.main,
    fontWeight: 600,
    cursor: "pointer"
  }
}))

const CommentCardAuthor = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: theme.typography.h6.fontSize,
}))

const CommentCardUsername = styled("span")(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontSize: theme.typography.h6.fontSize,
  marginRight: theme.spacing(1.25),
}))

const CommentCardTime = styled("span")(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: "0.625rem",
}))

const CommentCardContent = styled(Box)(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  lineHeight: theme.spacing(2.75),
  wordBreak: "break-word",
  padding: theme.spacing(1.25, 0, 0, 0),
  margin: 0,
  color: theme.palette.grey[800],
}))

const CommentCardActionComment = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  columnGap: theme.spacing(1),
  margin: 0,
  padding: theme.spacing(0.5),
  marginTop: theme.spacing(1),
  "& > span": {
    fontSize: theme.typography.h6.fontSize,
    cursor: "pointer",
    padding: theme.spacing(0, 0.75),
  },
}))

const CommentCardButtonLike = styled("span")<{
  isReplyOrEditOrDelete?: boolean
}>(({ theme, isReplyOrEditOrDelete }) => ({
  padding: 0,
  backgroundColor: isReplyOrEditOrDelete
    ? theme.palette.grey[300]
    : "transparent",
  borderRadius: theme.spacing(0.35),
  marginRight: theme.spacing(1),
}))

const CommentCardIconLike = styled("span")<{ liked: boolean }>(
  ({ theme, liked }) => ({
    position: "absolute",
    top: "-19px",
    right: 0,
    display: "flex",
    alignItems: "center",
    columnGap: theme.spacing(0.9),
    marginRight: theme.spacing(2),
    color: liked ? theme.palette.primary.main : theme.palette.grey[600],
    padding: theme.spacing(0.25),
    borderRadius: theme.spacing(1),
    backgroundColor: liked
      ? theme.palette.primary.lighter
      : theme.palette.background.paper,
    boxShadow: theme.shadows[4],

    "& > svg": {
      fontSize: theme.typography.h6.fontSize,
      marginBottom: theme.spacing(0.15)
    }
  })
)

const CommentCardNested = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  borderLeft: `1px solid ${theme.palette.grey[300]}`,
  marginTop: theme.spacing(2)
}))

function NewsCommentCard({
  comment,
  pGetUserId,
  pIsAdmin,
  pAddCommentReply,
  pUpdateComment,
  pDeleteComment,
  pCreateComment,
  pUpdateLikeComment,
  pGetCommentsByNewsId
}: INewsCommentCardProps) {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [isReply, setIsReply] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [isShowMore, setIsShowMore] = useState(true)

  const classes = useStyles()

  const checkButtonCancel = useMemo(() => isReply || isEdit, [isReply, isEdit])

  const handleToggleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
    setOpenMenu((prev) => !prev)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setOpenMenu(false)
  }

  const handleAddReply = async (value: string) => {
    const newCommentReply: ICommentReq = {
      newsId: comment.newsId,
      comment: value,
      parentCommentId: comment.id
    }

    await pCreateComment(newCommentReply)

    setIsReply(false)
    pGetCommentsByNewsId(comment.newsId)
  }

  const handleShowFormEdit = () => {
    setIsEdit(true)
    setOpenMenu(false)
  }

  const handleShowFormDelete = () => {
    setIsDelete(true)
    setOpenMenu(false)
  }

  const handleEditComment = async (value: string) => {
    const newComment: IComment = { ...comment, comment: value }

    await pUpdateComment(newComment)
    setIsEdit(false)
    pGetCommentsByNewsId(comment.newsId)
  }

  const handleCancel = () => {
    setIsReply(false)
    setIsEdit(false)
    setIsDelete(false)
  }

  const handleDeleteComment = async () => {
    await pDeleteComment(comment.id)
    setIsDelete(false)
    pGetCommentsByNewsId(comment.newsId)
  }

  const handleLikeComment = async () => {
    await pUpdateLikeComment({
      id: comment.id,
      liked: !comment.hasCurrentUserLiked
    })
    pGetCommentsByNewsId(comment.newsId)
  }

  return (
    <CommentCardContainer>
      <CommentCardInner>
        <IMSAvatar
          src={comment?.user?.avatar}
          alt={comment?.user?.name}
        />
        <CommentCardContentContainer>
          {isEdit && (
            <CommentForm
              initValue={comment?.comment}
              onSubmit={handleEditComment}
              isShowAvatar={false}
            />
          )}
          {!isEdit && (
            <CommentCardContentInner>
              <CommentCardAuthor>
                <Box>
                  <CommentCardUsername>
                    {comment?.user?.name || "Anonymous"}
                  </CommentCardUsername>
                  <CommentCardTime>
                    {timeSince(new Date(comment?.createdTime))}
                  </CommentCardTime>
                </Box>
                {(+comment?.user?.userId === pGetUserId || pIsAdmin) && (
                  <Box>
                    <IconButton onClick={handleToggleMenu}>
                      <MoreHorizIcon />
                    </IconButton>
                    <Menu
                      open={openMenu}
                      anchorEl={anchorEl}
                      onClose={handleCloseMenu}
                    >
                      {/* hide edit button when user is not owner of the comment */}
                      {+comment?.user?.userId === pGetUserId &&
                        <MenuItem onClick={handleShowFormEdit}>
                          Edit
                        </MenuItem>
                      }
                      <MenuItem onClick={handleShowFormDelete}>Delete</MenuItem>
                    </Menu>
                  </Box>
                )}
              </CommentCardAuthor>
              <CommentCardContent
                dangerouslySetInnerHTML={{
                  __html: isShowMore
                    ? shortenText(comment?.comment, MAX_STRING)
                    : comment?.comment
                }}
              />
              {comment?.comment?.length > MAX_STRING && (
                <div
                  className="more-text"
                  onClick={() => setIsShowMore(!isShowMore)}
                  aria-hidden="true"
                  role="button"
                >
                  {isShowMore ? "Read more" : "Read less"}
                </div>
              )}
            </CommentCardContentInner>
          )}
          <CommentCardActionComment>
            <CommentCardIconLike
              liked={comment?.hasCurrentUserLiked}
              onClick={handleLikeComment}
            >
              <ThumbUpIcon /> {comment?.likesCount}
            </CommentCardIconLike>
            {!isReply && !comment?.parentCommentId && (
              <CommentCardButtonLike onClick={() => setIsReply(true)}>
                Reply
              </CommentCardButtonLike>
            )}
            {checkButtonCancel && (
              <CommentCardButtonLike
                isReplyOrEditOrDelete={checkButtonCancel}
                onClick={handleCancel}
              >
                Cancel
              </CommentCardButtonLike>
            )}
          </CommentCardActionComment>
          {isReply && (
            <Box>
              <CommentForm onSubmit={handleAddReply} />
            </Box>
          )}
          <CommentCardNested>
            {comment?.reply?.map((commentReply) => (
              <NewsCommentCard
                pIsAdmin={pIsAdmin}
                pGetUserId={pGetUserId}
                pGetCommentsByNewsId={pGetCommentsByNewsId}
                pUpdateLikeComment={pUpdateLikeComment}
                pCreateComment={pCreateComment}
                key={commentReply.id}
                comment={commentReply}
                pAddCommentReply={pAddCommentReply}
                pDeleteComment={pDeleteComment}
                pUpdateComment={pUpdateComment}
              />
            ))}
          </CommentCardNested>
        </CommentCardContentContainer>
      </CommentCardInner>
      <IMSModal
        cancelButton={{
          title: "Cancel",
          variant: "outlined",
          onClick: () => {
            setIsDelete(false)
          }
        }}
        saveButton={{
          title: "Delete",
          onClick: handleDeleteComment,
          color: "error"
        }}
        open={isDelete}
        header={{ title: "Delete Comment", className: classes.headerModal }}
        contentClassName={classes.contentModal}
      >
        <Typography sx={{ padding: "20px 0" }} variant="body1">
          {`Do you want to delete ${(+comment?.user?.userId === pGetUserId) ? 'your' : 'the'} comment?`}
        </Typography>
      </IMSModal>
    </CommentCardContainer>
  )
}

const mapStateToProps = (state: AppState) => ({
  pGetUserId: sGetUserId(state),
  pIsAdmin: sIsAdmin(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    pAddCommentReply: (comment: IComment) => dispatch(createComment(comment)),
    pUpdateComment: (data: IUpdateCommentReq) => dispatch(updateComment(data)),
    pDeleteComment: (id: number) => dispatch(deleteComment(id)),
    pCreateComment: (comment: ICommentReq) => dispatch(createComment(comment)),
    pUpdateLikeComment: (data: ILikeCommentReq) =>
      dispatch(updateLikeComment(data)),
    pGetCommentsByNewsId: (id: number) => dispatch(getCommentsByNewsId(id))
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromStore = ConnectedProps<typeof connector>

export default connector(NewsCommentCard)
