import { Box, styled, Typography, TypographyProps } from "@mui/material"
import { AccessTime } from "@mui/icons-material"
import { shortDateFormat } from "@/utils/time"
import { IAlbum } from "@/types/album"

const StyledTraditionalRoomCard = styled(Box)<{ img: string }>(({ img }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 0.52",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  "&:hover": {
    backgroundImage: `linear-gradient(180deg, rgba(103,103,103,0.9) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 60%, rgba(103,103,103,1) 100%), url(${img})`,
    ".albumsTooltip": {
      display: "flex"
    }
  }
}))

const StyledToolTip = styled(Box)({
  display: "none",
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  flexDirection: "column",
  alignItems: "center",
  color: "white",
  width: "70%"
})

const StyledTitle = styled(Typography)<TypographyProps & {component: React.ElementType} >({
  fontWeight: "bolder",
  textAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical"
})

interface ITraditionalRoomCard {
  album: IAlbum
}

export function TraditionalRoomCard({
  album: { title, thumbnailImage, albumUrl, albumTime }
}: ITraditionalRoomCard) {
  return (
    <Box>
      <a href={albumUrl} rel="noreferrer" target="_blank">
        <StyledTraditionalRoomCard
          img={thumbnailImage}
        >
          <StyledToolTip className="albumsTooltip">
            <StyledTitle
              variant="body1"
              component="div"
            >
              {title}
            </StyledTitle>
            <Box sx={{ display: "flex", gap: "3px" }}>
              <AccessTime color="disabled" fontSize="small" />
              <Typography>{shortDateFormat(new Date(albumTime))}</Typography>
            </Box>
          </StyledToolTip>
        </StyledTraditionalRoomCard>
      </a>
    </Box>
  )
}
