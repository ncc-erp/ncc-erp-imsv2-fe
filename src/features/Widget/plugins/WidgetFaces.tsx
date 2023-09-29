import { getFacesImage } from "@/api/apiFaces"
import { FaceCard } from "@/components/Card/FaceCard"
import { IFacesRes } from "@/types/faces"
import { Card, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useEffect, useState, useRef } from "react"
import { CAROUSEL } from "@/enums/widget"
import styled from "styled-components"
import SwiperCore, { Autoplay, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

const useStyles = makeStyles<Theme>((theme) => ({
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
  }
}))

const SwiperStyle = styled(Swiper)`
  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 0;
  }
`

export default function WidgetFaces() {
  const classes = useStyles()
  const [facesList, setFacesList] = useState<IFacesRes[]>([])
  const swiperRef = useRef<SwiperCore | null>(null)

  useEffect(() => {
    const fetchFacesList = async () => {
      const res = await getFacesImage()
      setFacesList(res)
    }

    fetchFacesList()
  }, [])

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
      onSwiper={(swiper) => swiperRef.current = swiper}
      onInit={(swiper) => swiper.autoplay.stop()}
    >
      {facesList?.map?.((face) => (
        <SwiperSlide
          key={face.fullName + face.checkInAt}
          className={classes.swiper}
        >
          <Card className={classes.card}
            onMouseEnter={() => {
              swiperRef.current?.autoplay.start()
            }}
            onMouseLeave={() => {
              swiperRef.current?.autoplay.stop()
            }}
          >
            <FaceCard
              user={{
                ...face,
                projectUsers: face.projectUsers ?? []
              }}
            />
          </Card>
        </SwiperSlide>
      ))}
    </SwiperStyle>
  )
}
