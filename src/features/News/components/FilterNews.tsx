import { statusOptions } from "@/enums/news"
import { AppDispatch, AppState } from "@/store"
import { sMainCategories, sSubCategories } from "@/store/news/selector"
import { getCategories } from "@/store/news/thunkApi"
import { IMainCategories, ISubCategories, NEWS_CATEGORY } from "@/types"
import { DEFAULT_ALL } from "@/types/common"
import {
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material"
import { SELECT } from "@/enums/widget"
import { makeStyles } from "@mui/styles"
import { Dispatch, useEffect, useMemo } from "react"
import { connect } from "react-redux"

interface IFilterNewsProps {
  pGetCategories: () => Promise<unknown>
  pSubCategories: ISubCategories[]
  pMainCategories: IMainCategories[]
  setPage?: Dispatch<React.SetStateAction<number>>
  status?: number
  setStatus: Dispatch<React.SetStateAction<number>>
  mainCategory?: NEWS_CATEGORY
  setMainCategory: React.Dispatch<React.SetStateAction<NEWS_CATEGORY>>
  subCategory?: number
  setSubCategory: Dispatch<React.SetStateAction<number>>
  setPage_1?: ()=>void
}
const useStyles = makeStyles({
  filterContainer: {
    justifyContent: "space-between",
    marginTop: 0
  },
  menuPaper: {
    maxHeight: "20%"
  }
})
function FilterNews({
  pGetCategories,
  pSubCategories,
  pMainCategories,
  setPage,
  status,
  setStatus,
  mainCategory,
  setMainCategory,
  subCategory,
  setSubCategory,
  setPage_1
}: IFilterNewsProps) {
  const styles = useStyles()
  const handleChangeStatus = (event: SelectChangeEvent<number>) => {
    setStatus(+event.target.value || DEFAULT_ALL)
  }
  const handleChangeMainCategory = (event: SelectChangeEvent) => {
    setMainCategory((event.target.value as NEWS_CATEGORY) || NEWS_CATEGORY.ALL)
  }
  const handleChangeSubCategory = (event: SelectChangeEvent<number>) => {
    setSubCategory(+event.target.value || DEFAULT_ALL)
  }

  const subCategoryOptions = useMemo(() => {
    if (mainCategory === NEWS_CATEGORY.ALL) return pSubCategories
    return pSubCategories.filter(
      (sub) => sub.entityName === mainCategory || sub.id === DEFAULT_ALL
    )
  }, [mainCategory, pSubCategories])

  useEffect(() => {
    pGetCategories()
  }, [])

  useEffect(() => {
    if (subCategoryOptions.find((subCate) => subCate.id === subCategory)) {
     setPage_1 && setPage_1()
      setPage && setPage(1)
    }
  }, [mainCategory, subCategory, status])

  useEffect(() => {
    if (
      !subCategoryOptions.some((sub: ISubCategories) => sub.id === subCategory)
    )
      setSubCategory(DEFAULT_ALL)
  }, [subCategoryOptions])

  return (
    <Stack
      className={styles.filterContainer}
      spacing={1}
      mt={{ xs: 2 }}
      direction={"row"}
      sx={{ width: { xl: "40%", lg: "60%", md: "60%", sm: "60%", xs: "100%" } }}
    >
      <FormControl fullWidth sx={{ minWidth: '120px' }}>
        <InputLabel id="demo-simple-select-label" htmlFor="demo-simple-select">
          Main Categories
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pMainCategories.length > 1 ? mainCategory?.toString() : ''}
          label="mainCategory"
          onChange={handleChangeMainCategory}
          displayEmpty={false}
          MenuProps={{
            classes: { paper: styles.menuPaper },
            PaperProps: { sx: { maxHeight: SELECT.MAX_HEIGHT }}
          }}
        >
          {pMainCategories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ minWidth: '120px' }}>
        <InputLabel id="demo-simple-select-label">Sub Categories</InputLabel>
        <Select<number>
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subCategory}
          label="subCategory"
          onChange={handleChangeSubCategory}
          MenuProps={{
            classes: { paper: styles.menuPaper },
            PaperProps: { sx: { maxHeight: SELECT.MAX_HEIGHT }}
          }}
        >
          {subCategoryOptions.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {setPage && (
        <FormControl fullWidth sx={{ minWidth: '120px' }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select<number>
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="status"
            onChange={handleChangeStatus}
            MenuProps={{
              classes: { paper: styles.menuPaper },
              PaperProps: { sx: { maxHeight: SELECT.MAX_HEIGHT }}
            }}
          >
            {statusOptions.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Stack>
  )
}
const mapStateToProps = (state: AppState) => ({
  pMainCategories: sMainCategories(state),
  pSubCategories: sSubCategories(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetCategories: () => dispatch(getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterNews)
