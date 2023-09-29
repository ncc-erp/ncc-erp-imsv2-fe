import { useState, useEffect, useMemo } from "react"
import { Grid } from "@mui/material"
import { connect, ConnectedProps } from "react-redux"
import { makeStyles } from "@mui/styles"
import { useNavigate, useParams } from "react-router-dom"

import NewsPostContent from "@/features/News/components/NewsPostContent"
import RecommendedPosts from "@/features/News/components/RecommendedPosts"
import { AppState } from "@/store"
import { sIsAdmin,sIsHR } from "@/store/user/selector"
import { newsApi } from "@/api"
import { INewsDetail } from "@/types"
import RelatedPosts from "@/features/News/components/RelatedPosts"
import toast from "@/utils/toast"

const useStyles = makeStyles({
  newsDetailContainer: {
    maxWidth: 1230,
    padding: "0 15px",
    margin: "24px auto"
  },
  postWrapper: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "visible",
    boxSizing: "border-box",
    minHeight: 1,
    transform: "none",
    background: "#f7f8f9 none repeat fixed top center",
    borderRadius: 10,
    textAlign: "left",
    marginBottom: 30,
  }
})

const PreviewNews = (props: PropsFromStore) => {
  const { pIsAdmin,pIsHr } = props
  const classes = useStyles()

  const [newsDetail, setNewsDetail] = useState<INewsDetail>()

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const result = await newsApi.getAdminNewsDetail(Number(id))
        setNewsDetail(result)
      } catch (error: any) {
        toast.error(error.detail.message)
        navigate("/admin/manage-news")
      }
    })()
  }, []);

  const mainCategory = useMemo( () => {
    if (newsDetail) {
      return newsDetail.mainCategory.toLowerCase()
    }
    return ""
  }, [newsDetail])

  return newsDetail ? (
    <div className={classes.newsDetailContainer}>
      <Grid
        container
        justifyContent="space-between"
        columns={{ xs: 1, sm: 8, md: 12 }}
        sx={{ width: "100%" }}
        spacing={{ xs: 2, md: 3 }}
      >
        <Grid item xs={12} md={8}>
          <div className={classes.postWrapper}>
            <NewsPostContent
              item={newsDetail}
              isAdmin={pIsAdmin}
              isHR={pIsHr}
              previewMode={true}
              mainCategory={mainCategory}
            />
          </div>
          <div className={classes.postWrapper}>
            <RelatedPosts
              posts={newsDetail.relationNews}
              category={mainCategory}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <RecommendedPosts category={mainCategory} />
        </Grid>
      </Grid>
    </div>
  ) : null
}

const mapStateToProps = (state: AppState) => ({
  pIsAdmin: sIsAdmin(state),
  pIsHr: sIsHR(state)
})

const connector = connect(mapStateToProps, null)

type PropsFromStore = ConnectedProps<typeof connector>

export default connector(PreviewNews)
