import NewsCommentCard from "@/components/Card/NewsCommentCard"
import { CommentForm } from "@/components/Form"
import NewsPostContent from "@/features/News/components/NewsPostContent"
import RecommendedPosts from "@/features/News/components/RecommendedPosts"
import RelatedPosts from "@/features/News/components/RelatedPosts"
import { AppDispatch, AppState } from "@/store"
import { sCommentList, sDetailData } from "@/store/news/selector"
import {
  createComment,
  getCommentsByNewsId,
  getNewsDetailData,
  updateLikePost
} from "@/store/news/thunkApi"
import { setNewsUpdate } from "@/store/news"
import { IComment, ICommentReq, ILikeCommentReq, INewsUpdate, INewsValues } from "@/types"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { Box, Button, Grid, styled } from "@mui/material"
import theme from "@/themes"
import { sIsAdmin, sIsHR } from "@/store/user/selector"
import { grey } from "@mui/material/colors"
import { makeStyles } from "@mui/styles"
import { useEffect, useRef, useMemo } from "react"
import { connect, ConnectedProps } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import ChatIcon from "@mui/icons-material/Chat"
import FavoriteIcon from "@mui/icons-material/Favorite"

const CommentListContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.default
}))

const NewsDetail = ({
  pGetNewsDetailData,
  pCommentList,
  pDetailData,
  pCreateComment,
  pUpdateLikePost,
  pGetCommentsByNewsId,
  pSetNewsUpdate,
  pIsAdmin,
  pIsHR
}: PropsFromStore) => {
  const styles = useStyles()
  const commentRef = useRef<HTMLDivElement | null>(null)
  const { category, id = 0 } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    pGetNewsDetailData(+id)
    pGetCommentsByNewsId(+id)
  }, [id])

  const handleSendComment = async (value: string) => {
    const newComment: ICommentReq = {
      comment: value,
      newsId: +id,
      parentCommentId: null
    }
    await pCreateComment(newComment)
    pGetCommentsByNewsId(+id)
  }
  const handleLikePost = async () => {
    await pUpdateLikePost({
      id: pDetailData.id,
      liked: !pDetailData.hasCurrentUserLiked
    })
    pGetNewsDetailData(+id)
  }
  const handleToCommentClick = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleEditNew = () => {
    navigate(`/admin/manage-news/edit-news/${pDetailData.id}`)
  }

  const categoryStr = useMemo(
    () => (category as string).toLowerCase(), 
    [category]
  );

  return (
    <div className={styles.newsDetailContainer}>
      <Grid
        container
        justifyContent="space-between"
        columns={{ xs: 1, sm: 8, md: 12 }}
        sx={{ width: "100%" }}
        spacing={{ xs: 2, md: 3 }}
      >
        <Grid item xs={12} md={8}>
          <div className={styles.postWrapper}>
            <NewsPostContent item={pDetailData} isAdmin={pIsAdmin} onEdit={handleEditNew} isHR={pIsHR} mainCategory={categoryStr} />
          </div>
          <div className={styles.postAction}>
            <Button sx={{ gap: 1 }} onClick={handleLikePost}>
              {pDetailData.hasCurrentUserLiked ? (
                <FavoriteIcon
                  color="disabled"
                  fontSize="small"
                  sx={{ verticalAlign: "middle", color: "#f24822" }}
                />
              ) : (
                <FavoriteBorderIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", color: "#f24822" }}
                />
              )}
              {pDetailData.countLike}
            </Button>
            <Button onClick={handleToCommentClick}>
              {pCommentList.length > 0 ? (
                <ChatIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
              ) : (
                <ChatBubbleOutlineIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle" }}
                />
              )}
            </Button>
          </div>
          <div className={styles.postWrapper}>
            <RelatedPosts posts={pDetailData.relationNews} category={categoryStr} />
          </div>
          <Box ref={commentRef}>
            <CommentForm onSubmit={handleSendComment} />

            <CommentListContainer>
              {pCommentList?.map((comment: IComment) => (
                <NewsCommentCard key={comment.id} comment={comment} />
              ))}
            </CommentListContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <RecommendedPosts category={categoryStr} />
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles({
  newsDetailContainer: {
    maxWidth: 1230,
    padding: "0 15px",
    margin: "24px auto",
    [theme.breakpoints.up("xl")]: {
      width: "80vw",
      maxWidth: "1540px"
    }
  },
  postAction: {
    margin: "12px 0",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "& > button": {
      padding: "8px 16px",
      marginLeft: "12px",
      color: grey[700],
      fontSize: "15px",
      "&:hover": {
        backgroundColor: grey[100]
      },
      "& svg": {
        fontSize: "25px !important"
      }
    }
  },
  postWrapper: {
    position: "relative",
    overflow: "visible",
    boxSizing: "border-box",
    minHeight: 1,
    transform: "none",
    background: "#f7f8f9 none repeat fixed top center",
    borderRadius: 10,
    textAlign: "left",
    display: "flex",
    flexDirection: "column"
  }
})

const mapStateToProps = (state: AppState) => ({
  pDetailData: sDetailData(state),
  pCommentList: sCommentList(state),
  pIsAdmin: sIsAdmin(state),
  pIsHR: sIsHR(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetNewsDetailData: (id: number) => dispatch(getNewsDetailData(id)),
  pCreateComment: (comment: ICommentReq) => dispatch(createComment(comment)),
  pGetCommentsByNewsId: (id: number) => dispatch(getCommentsByNewsId(id)),
  pUpdateLikePost: (data: ILikeCommentReq) => dispatch(updateLikePost(data)),
  pSetNewsUpdate: (news: INewsUpdate) => dispatch(setNewsUpdate(news)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromStore = ConnectedProps<typeof connector>

export default connector(NewsDetail)
