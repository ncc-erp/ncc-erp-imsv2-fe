import NoImageAvailable from "@/assets/images/no_image_available_rectangle.svg"
import { StatusType } from "@/enums/news"
import { INewsForm, INewsRes } from "@/types"
import CloseIcon from "@mui/icons-material/Close"
import { Box, IconButton, styled, Typography } from "@mui/material"
import { SyntheticEvent } from "react"
import { useFormContext } from "react-hook-form"

export interface INewsRelationItemProps {
  news: INewsRes
  status?: number
}

const NewsRelationItemContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  padding: theme.spacing(4, 2, 2),
  borderBottom: `1px solid ${theme.palette.grey[200]}`,

  "&:last-child": {
    borderColor: "transparent"
  },

  "&:hover > button": {
    visibility: "visible"
  },

  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  }
}))

const NewsIconClose = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(0.5),
  right: theme.spacing(0.5),
  visibility: "hidden",
  transition: "0.2s ease-in-out"
}))

const NewsRelationItemImage = styled(Box)(({ theme }) => ({
  width: 80,
  img: {
    width: "100%",
    height: 65,
    borderRadius: theme.spacing(0.5),
    objectFit: "cover"
  },

  [theme.breakpoints.down("lg")]: {
    width: 120
  }
}))

const NewsRelationItemContent = styled(Box)(() => ({
  flex: "1 1 0"
}))

const NewsRelationItemTitle = styled("h4")(({ theme }) => ({
  lineHeight: 1.3,
  margin: theme.spacing(0, 0, 1),
  color: theme.palette.secondary.dark,
  textTransform: "uppercase",
  fontWeight: 700,
  overflow: "hidden",
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '3',
  WebkitBoxOrient: 'vertical'
}))

const NewsRelationItemSapo = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.fontSize,
  color: theme.palette.text.primary,
  overflow: "hidden",
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '3',
  WebkitBoxOrient: 'vertical'
}))

function NewsRelationItem({
  news,
  status = StatusType.DRAFT
}: INewsRelationItemProps) {
  const { getValues, setValue } = useFormContext<INewsForm>()
  const handleDeleteNewsLatest = () => {
    const list = getValues("relationNews")
    if (!list?.length) return
    const newList = list.filter(({ id }) => id !== news.id)
    setValue("relationNews", newList)
  }

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = NoImageAvailable
  }

  return (
    <NewsRelationItemContainer>
      {status === StatusType.DRAFT && (
        <NewsIconClose size="small" onClick={handleDeleteNewsLatest}>
          <CloseIcon />
        </NewsIconClose>
      )}
      <NewsRelationItemImage>
        <img
          src={news.thumbnailImage || NoImageAvailable}
          alt={news.title}
          onError={handleImgError}
        />
      </NewsRelationItemImage>
      <NewsRelationItemContent>
        <NewsRelationItemTitle>{news.title}</NewsRelationItemTitle>
        {news.sapo && <NewsRelationItemSapo>
          {news.sapo}
        </NewsRelationItemSapo>}
      </NewsRelationItemContent>
    </NewsRelationItemContainer>
  )
}

export default NewsRelationItem
