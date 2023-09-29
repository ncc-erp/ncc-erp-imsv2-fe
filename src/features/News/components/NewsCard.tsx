import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea, Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import ForumIcon from '@mui/icons-material/Forum';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface INewsCardProps {
  item: {
    thumbnail: string
    title: string
    createdDate: string
    nameAuthor: string
    avatarAuthor: string
    countLike: number
    countComment: number
    categoryColor: string
    categoryName: string
  }
}
const useStyles = makeStyles({
  cardFooter: {
    display: "flex",
    gap: 20,
    fontSize: 13,
    color: "GrayText",
    marginTop: 10,
    alignItems: "center",
  },
  avatarAuthor: {
    width: 32,
    height: 32,
    borderRadius: "50%",
  },
  cardContent: {
    padding: 30,
    textAlign: "left",
  },
  cardTitle: {
    fontWeight: "700 !important",
  },
  inforAuthor: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
  },
})
const NewsCard = ({ item }: INewsCardProps) => {
  const styles = useStyles()

  return (
    <Card sx={{ maxWidth: 445 }}>
      <CardActionArea sx={{ width: "100%" }}>
        <CardMedia
          component="img"
          height="192"
          image={item.thumbnail}
          alt="thumbnail"
        />
        <CardContent className={styles.cardContent}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={styles.cardTitle}
          >
            {item.title}
          </Typography>
          <Box className={styles.cardFooter}>
            <Typography>
              <AccessTimeIcon
                color="disabled"
                fontSize="small"
                sx={{ verticalAlign: "middle" }}
              />
              {item.createdDate}
            </Typography>
            <Typography>
              <ForumIcon
                color="disabled"
                fontSize="small"
                sx={{ verticalAlign: "middle" }}
              />
              {item.countComment}
            </Typography>
            <Typography>
              <FavoriteIcon
                color="disabled"
                fontSize="small"
                sx={{ verticalAlign: "middle" }}
              />
              {item.countLike}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default NewsCard
