import { useEffect } from "react"
import { Link } from "react-router-dom"
import { TagBg } from "@/assets/images/TagBg"
import { makeStyles } from "@mui/styles"
import { longDateTimeFormat } from "@/utils/time"
import IMSImage from "@/components/Image/IMSImage"
import { AppDispatch, AppState } from "@/store"
import { getNewsLatest } from "@/store/news/thunkApi"
import { INewsRes } from "@/types"
import { connect } from "react-redux"

interface IRecommendedPostsProps {
  pNewsLatestList: INewsRes[]
  pGetNewsLatest: () => Promise<unknown>
  category: string
}
function RecommendedPosts({
  pGetNewsLatest,
  pNewsLatestList,
  category
}: IRecommendedPostsProps) {
  useEffect(() => {
    pGetNewsLatest()
  }, [])
  const styles = useStyles()
  return (
    <div
      className={styles.recommendedPostsContainer}
      style={{ padding: "15px 15px" }}
    >
      <div className={styles.recommendedPostsHeader}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerText}>Latest News</div>
          <Link className={styles.seeMore} to={`/information/${category}`}>
            See More
          </Link>
        </div>
      </div>
      <div className={styles.postContainer}>
        {pNewsLatestList?.map((item, index) => (
          <Link className={styles.postItem} key={index} to={`/information/${item.mainCategory.toLowerCase()}/${item.id}`}>
            <div className={styles.postImage}>
              <IMSImage
                src={item.thumbnailImage}
                className={styles.thumbnail}
              />
            </div>
            <div className={styles.postDetail}>
              <div className={styles.postTitle}>{item.title}</div>
              <div className={styles.createDate}>
                {longDateTimeFormat(item.publishedTime)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
const mapStateToProps = (state: AppState) => ({
  pNewsLatestList: state.news.newsLatestList
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetNewsLatest: () => dispatch(getNewsLatest())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedPosts)
const useStyles = makeStyles({
  recommendedPostsContainer: {
    overflow: "auto",
    textAlign: "left",
    position: "sticky",
    top: "8%",
    background: "#f7f8f9 none repeat fixed top center",
    borderRadius: 10
  },
  recommendedPostsHeader: {
    paddingBottom: 6,
    marginBottom: 14,
    " &::after": {
      height: 1,
      display: "block",
      marginTop: 3,
      width: "100%",
      background: "#ccc",
      content: "''"
    }
  },
  headerText: {
    fontSize: "18px !importan",
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#cd5c5c"
  },
  headerWrapper: {
    display: "flex",
    justifyContent: "space-between"
  },
  seeMore: {
    fontSize: "0.8em",
    color: "#999"
  },
  postContainer: {
    display: "grid",
    gridGap: 20
  },
  postItem: {
    color: "#000",
    position: "relative",
    display: "grid",
    gridTemplateColumns: "84px 1fr"
  },
  postImage: {
    overflow: "hidden",
    position: "relative",
    height: 60
  },
  categoryTag: {
    width: 35,
    position: "absolute",
    top: 0
  },
  tagInfor: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: " #fff",
    fontSize: 6,
    textAlign: "center",
    width: "100%",
    overflow: "hidden"
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    objectPosition: "center",
    "&:hover": {
      transform: " scale(1.2)",
      transition: "transform 0.5s ease"
    }
  },
  postDetail: {
    marginLeft: 10
  },
  postTitle: {
    background: "linear-gradient(to right, currentColor 0%,currentColor 100%)",
    backgroundSize: "0px 1px",
    fontSize: "0.9em",
    fontWeight: 700,
    backgroundRepeat: "no-repeat",
    transition: "background 0.3s",
    maxHeight: 60,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-inline-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical"
  },
  createDate: {
    fontSize: "0.8em",
    color: "#999",
    textTransform: "uppercase"
  }
})
