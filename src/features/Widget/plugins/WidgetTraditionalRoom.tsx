import { Card, Theme, styled } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useEffect, useState, useRef } from "react"
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { CAROUSEL } from "@/enums/widget"
import { TraditionalRoomCard } from "@/components/Card/TraditionalRoomCard"
import { albumsApi } from "@/api"
import { checkCorrectLinkFormat } from "@/utils"
import { IAlbum } from "@/types/album"

const useStyles = makeStyles<Theme>((theme) => ({
  swiperWrapper: {
    height: "100%"
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

const StyledCard = styled(Card)(({ theme }) => ({
  margin: `0 ${theme.spacing(1)}`
}))

export default function WidgetTraditionalRoom() {
  const classes = useStyles()
  const [albums, setAlbums] = useState<IAlbum[]>([])
  const swiperRef = useRef<SwiperCore | null>(null)

  useEffect(() => {
    const fetchAllAlbums = async () => {
      const response = await albumsApi.getAllAlbums()
      // remove all ncc life category albums
      setAlbums(response.data.filter((album: IAlbum) => checkCorrectLinkFormat(album.albumUrl)));
    }
    fetchAllAlbums()
  }, [])
  return (
    <SwiperStyle
      spaceBetween={30}
      centeredSlides={true}
      speed={CAROUSEL.SPEED}
      autoplay={{
        delay: CAROUSEL.DEPLAY,
        disableOnInteraction: false,
        stopOnLastSlide: true,
        pauseOnMouseEnter: false,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3
      }}
      navigation={false}
      modules={[Autoplay, Pagination, Navigation]}
      className={`mySwiper ${classes.swiperWrapper}`}
      onSwiper={(swiper) => swiperRef.current = swiper}
      onInit={(swiper) => swiper.autoplay.stop()}
    >
      {albums.map((album) => (
        <SwiperSlide key={album.id}>
          <StyledCard
            onMouseEnter={() => {
              swiperRef.current?.autoplay.start()
            }}
            onMouseLeave={() => {
              swiperRef.current?.autoplay.stop()
            }}
          >
            <TraditionalRoomCard album={album} />
          </StyledCard>
        </SwiperSlide>
      ))}
    </SwiperStyle>
  )
}
