import { ColumnId, statusOptions } from "@/enums/news"
import SearchNews from "@/features/News/components/SearchNews"
import TableNews from "@/features/News/components/TableNews"
import { AppDispatch, AppState } from "@/store"
import { sMainCategories, sSubCategories } from "@/store/news/selector"
import { resetNewsUpdate } from "@/store/news"
import { getCategories, getTableData } from "@/store/news/thunkApi"
import { DEFAULT_ALL, IRequestParams, SORT_ENUM } from "@/types/common"
import {
  ColumnData,
  IReqOrder,
  NEWS_CATEGORY,
  IMainCategories,
  ISubCategories
} from "@/types/news"
import { PAGE_SIZE_LIST } from "@/types/pagination"
import useDebounce from "@/utils/useDebounce"
import AddIcon from "@mui/icons-material/Add"
import { Box, Button, MenuItem } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React, { useEffect, useMemo, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import MenuPopup from "@/components/MenuPopup/MenuPopup"
import FilterList, {
  IFilterListData
} from "@/features/News/components/FilterList"

interface IManageNewsProps {
  pGetTableData: (params: IRequestParams) => Promise<unknown>
  pResetNewsUpdate: () => void
  pGetCategories: () => Promise<unknown>
  pMainCategories: IMainCategories[]
  pSubCategories: ISubCategories[]
}

const columns: ColumnData[] = [
  { id: ColumnId.TITLE, label: "Title", minWidth: 150, align: "left" },

  {
    id: ColumnId.CREATED,
    label: "Created Date",
    minWidth: 155,
    align: "center",
    format: (value: number) => value.toFixed(2)
  },
  {
    id: ColumnId.PUBLISHED,
    label: "Published Date",
    minWidth: 155,
    align: "center",
    format: (value: number) => value.toFixed(2)
  }
]

const useStyles = makeStyles({
  header: {
    display: "flex",
    gap: 16,
    justifyContent: "space-between",
    marginBottom: 15,
    "@media screen and (max-width: 640px)": {
      flexDirection: "column",
      gap: 25
    }
  },
  leftHeader: {
    display: "flex",
    gap: 16
  },
  rightHeader: {
    display: "flex",
    gap: 16
  }
})

function ManageNewsPage({
  pGetTableData,
  pResetNewsUpdate,
  pGetCategories,
  pMainCategories,
  pSubCategories
}: IManageNewsProps) {
  const styles = useStyles()
  const [page, setPage] = useState(1) // *
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [reqSort, setReqSort] = useState<IReqOrder>({
    direction: SORT_ENUM.DESC,
    property: ColumnId.CREATED
  })
  const [status, setStatus] = useState<number>(DEFAULT_ALL) // *
  const [mainCategory, setMainCategory] = useState<NEWS_CATEGORY>(
    NEWS_CATEGORY.ALL
  )
  const [subCategory, setSubCategory] = useState<number>(DEFAULT_ALL)
  const [searchText, setSearchText] = useState<string>("")
  const debounceSearchText = useDebounce(searchText, 500)
  const navigate = useNavigate()
  const [mainCategoryFilter, setMainCategoryFilter] = useState<boolean[]>([])
  const [subCategoryFilter, setSubCategoryFilter] = useState<boolean[]>([])
  const [statusCategoryFilter, setStatusCategoryFilter] = useState<boolean[]>(
    []
  )

  const handleNavigate = () => {
    pResetNewsUpdate()
    navigate(`/admin/manage-news/create-news`)
  }

  useEffect(() => {
    pGetTableData({
      page: page,
      size: rowsPerPage,
      order: reqSort.direction,
      orderBy: reqSort.property as string,
      mainCategory:
        mainCategory === NEWS_CATEGORY.ALL ? undefined : mainCategory,
      subCategoryId: subCategory || undefined,
      status: status || undefined,
      search: debounceSearchText
    })
  }, [
    rowsPerPage,
    reqSort,
    page,
    mainCategory,
    subCategory,
    status,
    debounceSearchText
  ])

  useEffect(() => {
    pGetCategories()
    setStatusCategoryFilter(statusOptions.map((el, index) => index === 0))
  }, [])
  useEffect(() => {
    setMainCategoryFilter(pMainCategories.map((el, index) => index === 0))
  }, [pMainCategories])
  const subCategoryOptions = useMemo(() => {
    if (mainCategory === NEWS_CATEGORY.ALL) {
      return pSubCategories
    }
    const result = pSubCategories.filter(
      (sub) => sub.entityName === mainCategory || sub.id === DEFAULT_ALL
    )
    return result
  }, [mainCategory, pSubCategories])
  useEffect(() => {
    setSubCategoryFilter(subCategoryOptions.map((el, index) => index === 0))
  }, [subCategoryOptions])

  useEffect(() => {
    if (mainCategoryFilter.length !== 0) {
      setMainCategory(
        pMainCategories[mainCategoryFilter.findIndex((el) => el)]
          .id as NEWS_CATEGORY
      )
      setPage(1)
    }
  }, [mainCategoryFilter])
  useEffect(() => {
    const index = subCategoryFilter.findIndex((el) => el)
    if (index !== -1) {
      setSubCategory(subCategoryOptions[index].id)
      setPage(1)
    }
  }, [subCategoryFilter])
  useEffect(() => {
    const index = statusCategoryFilter.findIndex((el) => el)
    if (index !== -1) {
      setStatus(+statusOptions[index].id)
      setPage(1)
    }
  }, [statusCategoryFilter])

  const filterElData: IFilterListData[] = useMemo(() => {
    return [
      {
        title: "Main Categories",
        childrenSelect: pMainCategories.map((el, index) => ({
          title: el.label,
          isSelected: mainCategoryFilter[index],
          setIsSelected: (ind: number) => {
            setMainCategoryFilter((b) => {
              const bUpdate = [...b]
              bUpdate.fill(false)
              bUpdate[ind] = true
              return bUpdate
            })
          }
        }))
      },
      {
        title: "Sub Categories",
        childrenSelect: subCategoryOptions.map((el, index) => ({
          title: el.displayName,
          isSelected: subCategoryFilter[index],
          setIsSelected: (ind: number) => {
            setSubCategoryFilter((b) => {
              const bUpdate = [...b]
              bUpdate.fill(false)
              bUpdate[ind] = true
              return bUpdate
            })
          }
        }))
      },
      {
        title: "Status",
        childrenSelect: statusOptions.map((el, index) => ({
          title: el.value,
          isSelected: statusCategoryFilter[index],
          setIsSelected: (ind: number) => {
            setStatusCategoryFilter((b) => {
              const bUpdate = [...b]
              bUpdate.fill(false)
              bUpdate[ind] = true
              return bUpdate
            })
          }
        }))
      }
    ]
  }, [
    pMainCategories,
    mainCategoryFilter,
    subCategoryFilter,
    statusCategoryFilter
  ])

  return (
    <Box>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <SearchNews setSearchText={setSearchText} setPage={setPage} />
          <Button
            variant="contained"
            size="small"
            onClick={handleNavigate}
            color="primary"
          >
            <AddIcon />
          </Button>
        </div>
        <div className={styles.rightHeader}>
          <MenuPopup
            buttonProps={{
              variant: "contained",
              size: "small"
            }}
            buttonChildren={<FilterAltIcon />}
            MenuChildren={<FilterList width={250} filterEl={filterElData} />}
          />
        </div>
      </div>
      <TableNews
        columns={columns}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        setReqSort={setReqSort}
      />
    </Box>
  )
}
const mapStateToProps = (state: AppState) => ({
  pMainCategories: sMainCategories(state),
  pSubCategories: sSubCategories(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetTableData: (params: IRequestParams) => dispatch(getTableData(params)),
  pGetCategories: () => dispatch(getCategories()),
  pResetNewsUpdate: () => dispatch(resetNewsUpdate())
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageNewsPage)
