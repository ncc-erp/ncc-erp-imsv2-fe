import AddIcon from "@mui/icons-material/Add"
import {
  Button,
  styled,
  TableCell,
  tableCellClasses,
  TableRow
} from "@mui/material"
import { SyntheticEvent, useMemo } from "react"
import { useFormContext } from "react-hook-form"

import NoImageAvailable from "@/assets/images/no_image_available_rectangle.svg"
import { INewsForm, INewsRes, RowData } from "@/types"

export interface INewsItemProps {
  news: RowData
  index: number
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f8f8f9",
    color: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.body1,
    height: 96
  },
  "& > img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: theme.spacing(0.75)
  }
}))

function NewsItem({
  news,
  index
}: INewsItemProps) {
  const { getValues, setValue, watch } = useFormContext<INewsForm>()
  const checkIsDisabled: boolean = useMemo(() => {
    const list = getValues("relationNews")
    if (!list?.length) return false
    const idNewsList: string[] = list.map((news: INewsRes) => news.id + "")
    return idNewsList.includes(news.id + "")
  }, [watch("relationNews")])

  const handleAddNewsLatestList = () => {
    if (!checkIsDisabled) {
      const list = getValues("relationNews") ?? []
      const newItem: INewsRes = { ...news } as any
      list.push(newItem)
      setValue("relationNews", list)
    }
  }

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = NoImageAvailable
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={news.id}>
      <StyledTableCell align="center">
        {index + 1}
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ width: "150px" }}>
        <img
          src={news.thumbnailImage || NoImageAvailable}
          alt={news.title}
          onError={handleImgError}
        />
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ fontWeight: 700 }}>
        {news.title}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddNewsLatestList}
          size="small"
          sx={{ padding: "5px" }}
        >
          <AddIcon />
        </Button>
      </StyledTableCell>
    </TableRow>
  )
}

export default NewsItem
