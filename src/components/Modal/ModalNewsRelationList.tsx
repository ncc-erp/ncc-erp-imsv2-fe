import { TableNewsRelation } from "@/features/News/components"
import FilterNews from "@/features/News/components/FilterNews"
import SearchNews from "@/features/News/components/SearchNews"
import { AppDispatch } from "@/store"
import { getTableData } from "@/store/news/thunkApi"
import { INewsRes, IReqFilter, NEWS_CATEGORY } from "@/types"
import { DEFAULT_ALL, IRequestParams } from "@/types/common"
import { PAGE_SIZE_LIST } from "@/types/pagination"
import useDebounce from "@/utils/useDebounce"
import CloseIcon from "@mui/icons-material/Close"
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  styled,
  Typography
} from "@mui/material"
import { Dispatch, useEffect, useState } from "react"
import { connect } from "react-redux"

export interface IModalNewsLatestListProps {
  newsList: INewsRes[]
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  pGetTableData: (params: IRequestParams) => Promise<unknown>
}

const NewsDialogContainer = styled(Dialog)(() => ({
  "& .MuiPaper-root.MuiDialog-paper": {
    maxWidth: "100%"
  }
}))

const NewsDialogTitle = styled(DialogTitle)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}))

const NewsDialogContent = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  flexWrap: "wrap",
  width: "100%",
  maxWidth: 1000,
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper
}))

const NewsFilters = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8
})

function ModalNewsLatestList({
  newsList,
  open,
  setOpen,
  pGetTableData
}: IModalNewsLatestListProps) {
  const [page, setPage] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(PAGE_SIZE_LIST[0])
  const [searchText, setSearchText] = useState<string>("")
  const [status, setStatus] = useState<number>(DEFAULT_ALL)
  const [mainCategory, setMainCategory] = useState<NEWS_CATEGORY>(
    NEWS_CATEGORY.ALL
  )
  const [subCategory, setSubCategory] = useState<number>(DEFAULT_ALL)
  const debounceSearchText = useDebounce(searchText, 500)

  useEffect(() => {
    setPage(1)
    setSearchText("")
    setMainCategory(NEWS_CATEGORY.ALL)
    setSubCategory(DEFAULT_ALL)
    setStatus(DEFAULT_ALL)
  }, [open])

  useEffect(() => {
    pGetTableData({
      page,
      size: rowsPerPage,
      mainCategory:
        mainCategory === NEWS_CATEGORY.ALL ? undefined : mainCategory,
      subCategoryId: subCategory || undefined,
      status: status || undefined,
      search: searchText
    })
  }, [rowsPerPage, page, mainCategory, subCategory, status, debounceSearchText])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <NewsDialogContainer open={open}>
      <NewsDialogTitle>
        <Typography variant="h3" component="span">
          News
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </NewsDialogTitle>
      <Divider />
      <NewsDialogContent>
        <NewsFilters>
          <Box>
            <SearchNews setSearchText={setSearchText} setPage={setPage} />
          </Box>
          <FilterNews
            status={status}
            setStatus={setStatus}
            mainCategory={mainCategory}
            setMainCategory={setMainCategory}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            setPage={setPage}
          />
        </NewsFilters>
        <TableNewsRelation
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      </NewsDialogContent>
    </NewsDialogContainer>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    pGetTableData: (params: IRequestParams) => dispatch(getTableData(params))
  }
}

export default connect(null, mapDispatchToProps)(ModalNewsLatestList)
