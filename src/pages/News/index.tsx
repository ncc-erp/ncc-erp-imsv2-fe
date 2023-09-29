import NewsCard from "@/components/Card/NewsCard"
import InfiniteScroll from "@/components/InfiniteScroll/InfiniteScroll"
import { AppDispatch, AppState } from "@/store"
import { getNews } from "@/store/news/thunkApi"
import { DEFAULT_ALL, IRequestParams } from "@/types/common"
import { INewsRes, ISubCategories, NEWS_CATEGORY } from "@/types/news"
import { Box, Grid, Stack, Typography } from "@mui/material"
import { PayloadAction } from "@reduxjs/toolkit"
import { useEffect, useMemo, useState, useCallback } from "react"
import { connect } from "react-redux"
import SearchNews from "@/features/News/components/SearchNews"
import useDebounce from "@/utils/useDebounce"
import { updateLike } from "@/api/apiNews"
import { styled } from "@mui/material/styles"
import { useParams } from "react-router-dom"
import { capitalizeFirstLetter } from "@/utils"
import SubCategoriesSideBar from "@/features/News/components/SubCategoriesSideBar"
import { sSubCategories, sSubCategoryId } from "@/store/news/selector"
import { NoItemFound } from "@/components"

const ActionsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#fafafb",
  zIndex: 999,
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 0",
  position: "fixed",
  top: 62,
  [theme.breakpoints.between("xs", "lg")]: {
    width: "95vw"
  },
  [theme.breakpoints.only("lg")]: {
    width: "80vw"
  },
  [theme.breakpoints.only("xl")]: {
    width: "100%"
  },
  [theme.breakpoints.only("xs")]: {
    width: "90vw",
    flexDirection: "column",
    gap: 25
  }
}))
const NewsPageContainer = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  "& .MuiGrid-container": {
    marginTop: "90px"
  },
  [theme.breakpoints.between("xs", "lg")]: {
    width: "95vw"
  },
  [theme.breakpoints.only("lg")]: {
    width: "75vw"
  },
  [theme.breakpoints.only("md")]: {
    width: "75vw"
  },
  [theme.breakpoints.only("xl")]: {
    width: "80vw",
    maxWidth: "1540px"
  },
  [theme.breakpoints.only("xs")]: {
    width: "90vw",
    // fixed header
    marginTop: "150px"
  }
}))

interface INewsPageProps {
  pNewsList: INewsRes[],
  pHasNextPage: boolean,
  pGetNews: (params: IRequestParams) => Promise<PayloadAction<any>>,
  subCategory: number,
  subCategories: ISubCategories[]
}
const NewsPage = ({ pGetNews, pHasNextPage, subCategory, subCategories }: INewsPageProps) => {
  const [newsList, setNewsList] = useState<INewsRes[]>([])
  const [searchText, setSearchText] = useState<string>("")
  const [status, setStatus] = useState<number>(DEFAULT_ALL)
  const debounceSearchText = useDebounce(searchText, 500)
  const [page, setPage] = useState<number>(1)
  const debounceScollEnd = useDebounce(page, 100)
  const [hasFetchData, setHasFetchData] = useState(false);
  const { category } = useParams()

  const mainCategory = useMemo(() => {
    if (category) {
      return capitalizeFirstLetter(category.toLowerCase())
    }
    return null
  }, [category])

  const fetchData = async (page: number): Promise<INewsRes[]> => {
    const res = await pGetNews({
      page,
      size: 12,
      mainCategory:
        mainCategory === null ? undefined : mainCategory as NEWS_CATEGORY,
      subCategoryId: subCategory || undefined,
      search: debounceSearchText
    })
    const latestNews = res.payload.newList as INewsRes[]
    return latestNews
  }

  useEffect(() => {
    // check sub category is belongs to current main category: true => fetch data
    const findSubCategory = subCategories.find(({ id }) => id === subCategory)
    const isDiffCurrentMainCategory =
      findSubCategory && findSubCategory.entityName !== mainCategory
    if (subCategory !== DEFAULT_ALL &&
      (!findSubCategory || isDiffCurrentMainCategory)) {
      return
    }
    setPage(1)
    if(mainCategory) {
      fetchData(1).then((data) => {
        setNewsList(data)
        setHasFetchData(true);
      })
      const element = document.querySelector(".news-page")
      element?.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [mainCategory, subCategory, status, debounceSearchText])

  const handleEndScroll = () => {
    if(pHasNextPage && page === debounceScollEnd){
      setPage(b=>(b+1))
    }
  }
  useEffect(()=>{
    if(page!==1){
      fetchData(page).then((data) => {
        setNewsList([...newsList, ...data])
        setHasFetchData(true);
      })
    }
  },[page])
  const handleUpdateLike = useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      news: INewsRes
    ) => {
      e.stopPropagation()
      const index = newsList.findIndex((el) => el.id === news.id)
      if (index !== -1) {
        setNewsList((b) => {
          const bUpdate = [...b]
          const bItemChange = { ...bUpdate[index] }
          bItemChange.hasCurrentUserLiked = !b[index].hasCurrentUserLiked
          bItemChange.countLike = b[index].hasCurrentUserLiked
            ? b[index].countLike - 1
            : b[index].countLike + 1
          bUpdate[index] = bItemChange
          return bUpdate
        })
        const res = await updateLike({
          id: news.id,
          liked: !newsList[index].hasCurrentUserLiked
        })
      }
    },
    [newsList]
  )

  return (
    <Stack direction="row">
      <SubCategoriesSideBar
        mainCategory={mainCategory as NEWS_CATEGORY}
      />
      <Box sx={{ flex: 1 }}>
        <InfiniteScroll className="news-page" onEndScroll={handleEndScroll}>
          <NewsPageContainer>
            <ActionsContainer>
              <Box
                sx={{
                  width: { xl: "30%", lg: "35%", sm: "35%", xs: "100%" },
                  maxWidth: "350px"
                }}
              >
                <SearchNews
                  setSearchText={setSearchText}
                  setPage_1={()=>setPage(1)}
                />
              </Box>
            </ActionsContainer>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 8, lg: 12, xl: 12 }} sx={{ paddingBottom: (theme) => theme.spacing(4) }}>
              {(hasFetchData && !newsList.length) && <NoItemFound />}
              {newsList.map((item) => (
                <NewsCard item={item} handleLike={handleUpdateLike} key={item.id} />
              ))}
            </Grid>
          </NewsPageContainer>
        </InfiniteScroll>
      </Box>
    </Stack>
  )
}

const mapStateToProps = (state: AppState) => ({
  pNewsList: state.news.newsList,
  pHasNextPage: state.news.hasNextPage,
  subCategory: sSubCategoryId(state),
  subCategories: sSubCategories(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetNews: (params: IRequestParams) => dispatch(getNews(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage)
