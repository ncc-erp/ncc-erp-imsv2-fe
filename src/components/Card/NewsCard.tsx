import theme from "@/themes"
import { INewsRes } from "@/types"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import ChatIcon from "@mui/icons-material/Chat"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { Box, CardActionArea, Grid, Tooltip, Checkbox } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { makeStyles } from "@mui/styles"
import { longDateTimeFormat } from "@/utils/time"
import IMSImage from "@/components/Image/IMSImage"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import { useState } from "react"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import Link from '@mui/material/Link';
interface INewsCardProps {
  item: INewsRes
  handleLike: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    news: INewsRes
  ) => void
}

const useStyles = makeStyles({
  cardFooter: {
    display: "flex",
    fontSize: 13,
    color: "GrayText",
    marginTop: 15,
    justifyContent: "space-between"
  },
  contentFooter: {
    display: "flex",
    alignItems: "center"
  },
  cardContent: {
    height: "45%",
    padding: 30,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&.MuiCardContent-root": {
      padding: 16
    }
  },
  cardTitle: {
    textTransform: "capitalize",
    maxHeight: 60,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical"
  },
  thumnail: {
    position: "relative",
    height: "55%"
  },
  categoryTag: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 2,
    width: "80%",
    right: 30
  },
  tagBackground: {
    objectFit: "contain",
    width: "100%",
    height: "100%"
  },
  tagInfor: {
    color: "white",
    display: "inline-block",
    height: "auto",
    padding: "7px 11px 6px",
    borderRadius: 20,
    marginRight: 5,
    textTransform: "uppercase",
    verticalAlign: "top",
    transition: " all .2s ease-in-out",
    fontSize: 12
  },
  cardWrapper: {
    height: 300,
    "&.MuiPaper-root.MuiCard-root": {
      borderRadius: 8,
      border: `1px solid ${theme.palette.grey[200]} `,
      boxShadow: `2px 2px 16px 2px ${theme.palette.grey[100]}`,
      "&:hover": {
        boxShadow: `2px 2px 16px 2px ${theme.palette.grey[200]}`
      }
    }
  },
  cardAction: {
    height: "100%",
    "&.MuiButtonBase-root.MuiCardActionArea-root:hover .MuiCardActionArea-focusHighlight":
      {
        opacity: 0.03
      }
  }
})

const NewsCard = ({ item, handleLike }: INewsCardProps) => {
  const [isHover, setIsHover] = useState(false)
  const classes = useStyles()

  return (
    <Grid item xs={4} xl={3}>
      <Link sx={{ "&:hover": { textDecoration: "none" }}}
        href={`/information/${item.mainCategory?.toLowerCase()}/${item.id}`}>
        <Card
          className={classes.cardWrapper}
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          <CardActionArea className={classes.cardAction} disableRipple={isHover}>
            <div className={classes.thumnail}>
              <IMSImage src={item.thumbnailImage} />
              <div className={classes.categoryTag}>
                <div
                  className={classes.tagInfor}
                  style={{ backgroundColor: `${item.subCategoryColor}` }}
                >
                  {item.subCategory}
                </div>
              </div>
            </div>

            <CardContent className={classes.cardContent}>
              <Tooltip title={`${item.title}`} placement="top-start" arrow>
                <Typography
                  variant="h5"
                  component="div"
                  className={classes.cardTitle}
                >
                  {item.title}
                </Typography>
              </Tooltip>

              <Box className={classes.cardFooter}>
                <div className={classes.contentFooter}>
                  <AccessTimeIcon
                    fontSize="small"
                    sx={{ verticalAlign: "middle", mr: 1 }}
                  />
                  <Typography>
                    {longDateTimeFormat(item.publishedTime)}
                  </Typography>
                </div>
                <div
                  className={classes.contentFooter}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  {item.countComment > 0 ? (
                    <ChatIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
                  ) : (
                    <ChatBubbleOutlineIcon
                      fontSize="small"
                      sx={{ verticalAlign: "middle" }}
                    />
                  )}

                  <Typography sx={{ pl: 1 }}>{item.countComment}</Typography>
                  <Checkbox
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    color="error"
                    icon={<FavoriteBorder />}
                    checkedIcon={<FavoriteIcon sx={{ color: "#f24822" }} />}
                    onClick={(e) => handleLike(e, item)}
                    checked={item.hasCurrentUserLiked}
                  />

                  <Box width={10}>
                    <Typography>{item.countLike}</Typography>
                  </Box>
                </div>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  )
}
export default NewsCard
