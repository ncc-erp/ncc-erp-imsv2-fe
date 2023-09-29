import IMSImage from "@/components/Image/IMSImage"
import { AppDispatch, AppState } from "@/store"
import { getNewsLatest } from "@/store/news/thunkApi"
import { INewsRes } from "@/types"
import { longDateTimeFormat } from "@/utils/time"
import AccessTime from "@mui/icons-material/AccessTime"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ForumIcon from "@mui/icons-material/Forum"
import {
  Card,
  CardContent,
  Theme,
  Typography,
  Checkbox,
  Box,
  Tooltip,
  Zoom
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useCallback, useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"

import FavoriteBorder from "@mui/icons-material/FavoriteBorder"

import { updateLike } from "@/api/apiNews"
import { updateLikeNewsLatest } from "@/store/news"
import { WIDGET_PADDING, WIDGET_SPACING, WIDGET_WIDTH } from "../GridLayout"

interface IWidgetNewsProps {
  pNewsLatestList: INewsRes[]
  pGetNewsLatest: () => Promise<unknown>
  row?: number
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    height: "100%"
  },
  swiper: {
    display: "flex",
    justifyContent: "center"
  },
  card: {
    margin: `0 ${theme.spacing(1)}`,
    height: "90%",
    display: "flex",
    flexDirection: "column",
    "& :hover": {
      cursor: "pointer"
    }
  },
  thumbnail: {
    padding: theme.spacing(1),
    flex: 1,
    height: "60%",
    "& > img": {
      borderRadius: theme.shape.borderRadius * 4,
      height: "100%"
    }
  },
  content: {
    flexDirection: "column",
    justifyContent: "space-between",
    display: "flex",
    paddingBottom: "12px !important"
  },
  containerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  groupContent: {
    display: "flex",
    "& svg": {
      marginRight: theme.spacing(1)
    }
  },
  title: {
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    height: 50
  }
}))

const WidgetNews = ({ pGetNewsLatest, pNewsLatestList, row = 0 }: IWidgetNewsProps) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    pGetNewsLatest()
  }, [])
  const handleUpdateLike = useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      news: INewsRes
    ) => {
      e.stopPropagation()
      const index = pNewsLatestList.findIndex((el) => el.id === news.id)
      if (index !== -1) {
        dispatch(updateLikeNewsLatest(index))
        const res = await updateLike({
          id: news.id,
          liked: !pNewsLatestList[index].hasCurrentUserLiked
        })
      }
    },
    [pNewsLatestList]
  )
  return (
    <SwiperStyle
      enabled={true}
      slidesPerView={1}
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      pagination={{
        clickable: true
      }}
      modules={[Autoplay, Pagination]}
      className={`mySwiper ${classes.root}`}
      style={{
        height: row * (WIDGET_WIDTH - WIDGET_SPACING) - WIDGET_PADDING * 2
      }}
    >
      {pNewsLatestList?.map((news) => (
        <SwiperSlide key={news.id} className={classes.swiper}>
          <Card
            onClick={() => {
              navigate(`/information/${news.mainCategory.toLowerCase()}/${news.id}`)
            }}
            className={classes.card}
          >
            <Box className={classes.thumbnail} sx={{ flex: 1 }}>
              <IMSImage src={news.thumbnailImage} />
            </Box>
            <CardContent className={classes.content}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={classes.title}
              >
                <Tooltip
                  title={news.title}
                  placement="bottom"
                  TransitionComponent={Zoom}
                >
                  <div>{news.title}</div>
                </Tooltip>
              </Typography>
              <div className={classes.containerContent}>
                <div className={classes.groupContent}>
                  <AccessTime color="disabled" fontSize="small" />
                  <Typography>
                    {longDateTimeFormat(news.publishedTime)}
                  </Typography>
                </div>
                <div
                  className={classes.groupContent}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    width={42}
                    height={42}
                    sx={{
                      input: { height: 42, width: 42 },
                      ".MuiButtonBase-root svg": { m: 0 }
                    }}
                  >
                    <Checkbox
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      color="error"
                      icon={<FavoriteBorder />}
                      checkedIcon={<FavoriteIcon sx={{ color: "#f24822" }} />}
                      onClick={(e) => handleUpdateLike(e, news)}
                      checked={news.hasCurrentUserLiked}
                    />
                  </Box>
                  <Typography>{news.countLike || 0}</Typography>
                  <ForumIcon
                    sx={{ marginLeft: 1 }}
                    color="disabled"
                    fontSize="small"
                  />
                  <Typography>{news.countComment || 0}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </SwiperStyle>
  )
}

const mapStateToProps = (state: AppState) => ({
  pNewsLatestList: state.news.newsLatestList
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetNewsLatest: () => dispatch(getNewsLatest())
})

export default connect(mapStateToProps, mapDispatchToProps)(WidgetNews)

const SwiperStyle = styled(Swiper)`
  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 10px;
  }
`
