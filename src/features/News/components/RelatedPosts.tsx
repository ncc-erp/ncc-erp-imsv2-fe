import { Link } from "react-router-dom"
import { TagBg } from "@/assets/images/TagBg"
import { makeStyles } from "@mui/styles"
import { longDateTimeFormat } from "@/utils/time"
import IMSImage from "@/components/Image/IMSImage"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "swiper/css/navigation"
import "swiper/css"
type IRelatedPosts = {
  id: number
  thumbnailImage: string
  title: string
  publishedTime: Date
  nameAuthor: string
  avatarAuthor: string
  countLike: number
  countComment: number
  categoryColor: string
  categoryName: string
}
interface IRelatedPostsProps {
  posts: IRelatedPosts[]
  category: string
}
export default function RelatedPosts({ posts, category }: IRelatedPostsProps) {
  const styles = useStyles()
  return (
    <div style={{ padding: 15 }}>
      <div className={styles.relatedPostsHeader}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerText}>Relation News</div>
          <Link className={styles.seeMore} to={`/information/${category}`}>
            See More
          </Link>
        </div>
      </div>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className={`mySwiper ${styles.postContainer}`}
        slidesPerView={"auto"}
      >
        {posts?.map((item, index) => (
          <SwiperSlide key={index} style={{ width: 280 }}>
            <Link className={styles.postItem} to={`/information/${category.toLowerCase()}/${item.id}`}>
              <div className={styles.postImage}>
                <IMSImage
                  src={item.thumbnailImage}
                  className={styles.thumbnail}
                />

                <div className={styles.categoryTag}>
                  <TagBg fill={item.categoryColor} />
                  <div className={styles.tagInfor}>{item.categoryName}</div>
                </div>
              </div>
              <div className={styles.postDetail}>
                <div className={styles.postTitle}>{item.title}</div>
                <div className={styles.createDate}>
                  <span>{longDateTimeFormat(item.publishedTime)}</span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
const useStyles = makeStyles({
  relatedPostsHeader: {
    marginBottom: "15px",
    paddingBottom: 6,
    position: "relative",
    textAlign: "left",
    fontSize: "18px !important",
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
    gridGap: 20,
    gridTemplateColumns: "1fr 1fr 1fr",
    color: "#000",
    "& .swiper-slide": {
      marginRight: "12px !important",
      height: 200
    },
    "& .swiper-slide:last-child": {
      marginRight: "0 !important"
    },
    "& .swiper-wrapper": {
      alignItems: "center"
    },
    "& .swiper-button-prev, & .swiper-button-next": {
      color: "#ffff",
      top: "var(--swiper-navigation-top-offset,0%)",
      height: "100%",
      width: "5%",
      margin: "unset",
      opacity: 0,
      "&:hover": {
        transition: "all 0.5s ease",
        opacity: 1
      }
    },
    "& .swiper-button-prev": {
      left: "var(--swiper-navigation-sides-offset,0px)",
      "&:hover": {
        background:
          "linear-gradient(90deg, #535353ed 35%, rgb(250 250 251 / 5%) 100%)"
      }
    },
    "& .swiper-button-next": {
      right: "var(--swiper-navigation-sides-offset,0px)",
      "&:hover": {
        background:
          "linear-gradient(270deg, #535353ed 35%, rgb(250 250 251 / 5%) 100%)"
      }
    },
    "& .swiper-button-disabled": {
      opacity: "0 !important"
    }
  },
  postItem: {
    color: "#000",
    position: "relative",
    display: "grid"
  },
  postImage: {
    overflow: "hidden",
    position: "relative",
    width: "100%",
    height: 112
  },
  categoryTag: {
    width: 50,
    position: "absolute",
    top: 0
  },
  tagInfor: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: " #fff",
    fontSize: 8,
    textAlign: "center",
    width: "100%",
    overflow: "hidden"
  },
  thumbnail: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    objectPosition: "center",
    "&:hover": {
      transform: " scale(1.2)",
      transition: "transform 0.5s ease"
    }
  },
  postDetail: {
    margin: "10px 0"
  },
  postTitle: {
    background: "linear-gradient(to right, currentColor 0%,currentColor 100%)",
    backgroundSize: "0px 1px",
    fontSize: "1rem",
    fontWeight: 700,
    backgroundRepeat: "no-repeat",
    transition: "background 0.3s",
    height: 48,
    width: 280,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    wordBreak: "break-word"
  },
  createDate: {
    fontSize: "0.875rem",
    color: "#999",
    textTransform: "uppercase",
    fontWeight: 400,
    marginTop: 5
  },
  nameAuthor: {
    marginRight: 3
  }
})
