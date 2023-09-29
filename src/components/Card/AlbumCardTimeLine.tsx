import { IAlbum } from "@/pages/TimelineAlbum"
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import moment from "moment"

interface Props {
  data: IAlbum
}
export default function AlbumCardTimeline(props: Props) {
  const { data } = props
  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()
    window.open(data.albumUrl, "_blank")
  }
  return (
    <Card
      sx={{
        boxShadow: "none",
        border: "rgba(0,0,0,0.15) solid 1px",
        "&:hover": { cursor: "pointer" },
        borderRadius: 2
      }}
      onClick={handleCardClick}
    >
      <CardMedia sx={{ height: 180 }} image={data.thumbnailImage} title={data.title} />
      <CardContent sx={{ p: 2 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          mb={0}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical"
          }}
        >
          {data.title}
        </Typography>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          fontSize: 13,
          color: "GrayText",
          marginTop: "20px"
        }}>
          <AccessTimeIcon
            fontSize="small"
            sx={{ verticalAlign: "middle", mr: 1 }}
          />
          <Typography variant="body2">
            {moment(data.albumTime).format("DD-MM-YYYY")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
