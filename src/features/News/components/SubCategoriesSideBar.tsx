import { useMemo, useEffect, SyntheticEvent } from "react"
import { Tabs, Tab, Typography, Box } from "@mui/material"
import { ConnectedProps, connect } from "react-redux"
import { styled } from "@mui/material/styles"

import { DEFAULT_ALL, NEWS_CATEGORY } from "@/types"
import { AppDispatch, AppState } from "@/store"
import { sSubCategories, sSubCategoryId } from "@/store/news/selector"
import { getCategories } from "@/store/news/thunkApi"
import { setSubCategoryId } from "@/store/news"
import { HEADER_HEIGHT } from "@/enums/layout"

interface ISubCategoriesSideBarProps extends PropsFromStore {
  mainCategory: NEWS_CATEGORY
}

const CustomBox = styled(Box)(({ theme }) => ({
  display: "flex",
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  overflowX: "hidden",
  overflowY: "auto",
  flexDirection: "column",
  borderRight: `1px solid ${theme.palette.divider}`,
  width: 200,
  [theme.breakpoints.down("md")]: {
    display: "none",
    visibility: "hidden",
    opacity: 0
  }
}))

const TabsCustom = styled(Tabs)(({ theme }) => ({
  padding: `0 ${theme.spacing(3)}`,
  "& .MuiTabs-scroller": {
    overflow: "visible!important",
  }
}))

const TabCustom = styled(Tab)(({ theme }) => ({
  wordBreak: "break-word",
  "&:hover": {
    color: theme.palette.primary.light
  },
  "& .active": {
    color: theme.palette.primary.main
  }
}))

const CustomTypo = styled(Typography)(({ theme }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(2)}`,
  marginBottom: 1,
  textAlign: "left",
  position: "sticky",
  top: 0,
  background: '#fafafb',
  zIndex: 1
}))

const SubCategoriesSideBar = (props: ISubCategoriesSideBarProps) => {
  const {
    mainCategory,
    pSubCategories,
    pGetCategories,
    subCategory,
    setSubCategory,
  } = props

  useEffect(() => {
    pGetCategories()
  }, [])

  const subCategoryOptions = useMemo(() => {
    if (mainCategory === NEWS_CATEGORY.ALL) return pSubCategories
    return pSubCategories.filter(
      (sub) => sub.entityName === mainCategory || sub.id === DEFAULT_ALL
    )
  }, [mainCategory, pSubCategories])

  const handleChange = (e: SyntheticEvent, value: number) => {
    setSubCategory((Number(e.currentTarget.id)))
  }

  return (
    <CustomBox>
      <CustomTypo variant="h5">Sub Categories</CustomTypo>
      <TabsCustom
        orientation="vertical"
        variant="standard"
        value={subCategory}
        onChange={handleChange}
        TabIndicatorProps={{
          sx: {
            backgroundColor: "transparent"
          }
        }}
      >
        {subCategoryOptions.map(s => (
          <TabCustom
            key={s.id}
            label={s.displayName}
            id={(s.id).toString()}
            className="active"
            value={s.id}
            sx={{
              alignItems: 'flex-start',
              textAlign: 'left',
              padding: 0
            }}
          />
        ))}
      </TabsCustom>
    </CustomBox>
  )
}

const mapStateToProps = (state: AppState) => ({
  pSubCategories: sSubCategories(state),
  subCategory: sSubCategoryId(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetCategories: () => dispatch(getCategories()),
  setSubCategory: (id: number) => dispatch(setSubCategoryId(id))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromStore = ConnectedProps<typeof connector>

export default connector(SubCategoriesSideBar)
