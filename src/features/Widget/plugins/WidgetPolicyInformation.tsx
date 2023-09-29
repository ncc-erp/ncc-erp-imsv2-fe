import IMSImage from "@/components/Image/IMSImage"
import { AppDispatch, AppState } from "@/store"
import { getPolicyInformations } from "@/store/news/thunkApi"
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
import { useCallback, useEffect, useRef } from "react"
import { connect, useDispatch } from "react-redux"
import { CAROUSEL } from "@/enums/widget"
import styled from "styled-components"
import SwiperCore, { Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import { updateLike } from "@/api/apiNews"
import { updateLikePolicyInformations } from "@/store/news"
import { WIDGET_PADDING, WIDGET_SPACING, WIDGET_WIDTH } from "../GridLayout"
import Link from '@mui/material/Link';

interface IWidgetPolicyInformations {
  pPolicyInformations: INewsRes[]
  pGetPolicyInformations: () => Promise<unknown>
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

const WidgetPolicyInformations = ({ pGetPolicyInformations, pPolicyInformations, row = 0 }: IWidgetPolicyInformations) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const swiperRef = useRef<SwiperCore | null>(null)

  useEffect(() => {
    pGetPolicyInformations()
  }, [])

  const handleUpdateLike = useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      news: INewsRes
    ) => {
      e.stopPropagation()

      const index = pPolicyInformations.findIndex((el) => el.id === news.id)
      if (index !== -1) {
        dispatch(updateLikePolicyInformations(index))
        const res = await updateLike({
          id: news.id,
          liked: !pPolicyInformations[index].hasCurrentUserLiked
        })
      }
    },
    [pPolicyInformations]
  )
  return (
    <SwiperStyle
      enabled={true}
      slidesPerView={1}
      spaceBetween={30}
      centeredSlides
      speed={CAROUSEL.SPEED}
      autoplay={{
        delay: CAROUSEL.DEPLAY,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        stopOnLastSlide: true
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3
      }}
      modules={[Autoplay, Pagination]}
      className={`mySwiper ${classes.root}`}
      style={{
        height: row * (WIDGET_WIDTH - WIDGET_SPACING) - WIDGET_PADDING * 2
      }}
      onSwiper={(swiper) => swiperRef.current = swiper}
      onInit={(swiper) => swiper.autoplay.stop()}
    >
      {pPolicyInformations?.map((news) => (
        <SwiperSlide key={news.id} className={classes.swiper}>
          <Link sx={{ "&:hover": { textDecoration: "none" }}}
            href={`/information/${news.mainCategory.toLowerCase()}/${news.id}`}>
            <Card
              className={classes.card}
              onMouseEnter={() => {
                swiperRef.current?.autoplay.start()
              }}
              onMouseLeave={() => {
                swiperRef.current?.autoplay.stop()
              }}
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
          </Link>
        </SwiperSlide>
      ))}
    </SwiperStyle>
  )
}

const mapStateToProps = (state: AppState) => ({
  pPolicyInformations: state.news.policyInformations
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetPolicyInformations: () => dispatch(getPolicyInformations())
})

export default connect(mapStateToProps, mapDispatchToProps)(WidgetPolicyInformations)

const SwiperStyle = styled(Swiper)`
  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 10px;
  }
`
