import { Box, Grid, Paper, Typography, styled } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import moment from "moment"
import { getAlbumList } from "@/api/apiAlbums"
import AlbumCardTimeline from "@/components/Card/AlbumCardTimeLine"
import { InfiniteScroll, NoItemFound } from "@/components"
import TimeLineLoading from "@/components/Loading/TimelineLoading"
import ActionsTimeLine from "./Actions"
import useDebounce from "@/utils/useDebounce"

export interface IAlbum {
  id: number
  title: string
  description: string
  thumbnailImage: string
  albumIndex: number
  albumUrl: string
  albumTime: string
  category: string
  categoryColor: string
  isActive: boolean
}

export default function TimelineAlbumPage() {
  const [albumList, setAlbumList] = useState<
    { time: string; data: IAlbum[] }[]
  >([])
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [page, setPage] = useState<number>(1)
  const [isLast, setIsLast] = useState<boolean>(false)
  const debouncedPageValue = useDebounce(page, 300)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [enteredSearch, setEnteredSearch] = useState<string>("")
  const [year, setYear] = useState<string>("0")
  const [category, setCategory] = useState<string>("0")

  const fetchData = useCallback(
    async (
      page: number,
      year: string | null,
      categoryId: string,
      search: string
    ) => {
      setIsLoading(true)
      const res = await getAlbumList(year, categoryId, search, page)
      if (!res.hasNextPage) {
        setIsLast(true)
      }
      const dataRes: IAlbum[] = res.data
      setAlbumList((b) => {
        const albumListUpdate = [...b]
        dataRes.forEach((el) => {
          const month = moment(el.albumTime).format("MMMM")
          const year = moment(el.albumTime).year()
          const time = month + " " + year
          const elIndex = albumListUpdate.findIndex((e) => e.time === time)
          if (elIndex !== -1) {
            albumListUpdate[elIndex].data.push(el)
          } else {
            albumListUpdate.push({ time, data: [el] })
          }
        })
        return albumListUpdate
      })
      setIsLoading(false)
    },
    [albumList]
  )
  useEffect(() => {
    fetchData(
      debouncedPageValue,
      year === "0" ? null : year,
      category === "0" ? "" : category,
      enteredSearch
    )
  }, [debouncedPageValue])
  useEffect(() => {
    // Prevent function active on the first time render.
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }
    setAlbumList([])
    if (page === 1) {
      //  user hasn't performed a scroll yet
      fetchData(
        1,
        year === "0" ? null : year,
        category === "0" ? "" : category,
        enteredSearch
      )
    } else {
      // user has performed a scroll
      setPage(1)
    }
    setIsLast(false)
  }, [year, category, enteredSearch])
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - ${HEADER_HEIGHT}px)",
        position: "relative"
      }}
    >
      <InfiniteScroll
        onEndScroll={() =>
          !isLast && debouncedPageValue === page && setPage((b) => b + 1)
        }
      >
        <Box
          sx={{
            width: { md: "100%", lg: "1152px", xl: "80vw" },
            maxWidth: { xl: "1540px" },
            mx: "auto",
            pt: 2
          }}
        >
          <ActionsTimeLine
            enteredSearch={enteredSearch}
            setEnteredSearch={setEnteredSearch}
            category={category}
            setCategory={setCategory}
            year={year}
            setYear={setYear}
          />
          {!!albumList.length &&
            albumList.map((el) => {
              return (
                <Paper
                  key={el.time}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    mb: 2,
                    boxShadow: "none",
                    backgroundColor: "transparent"
                  }}
                >
                  <Typography fontWeight={600} fontSize={28} mb={2}>
                    {el.time}
                  </Typography>
                  <Grid container spacing={2}>
                    {el.data.map((ell) => {
                      return (
                        <Grid key={ell.id} item lg={4} md={6} sm={6} xs={12}>
                          <AlbumCardTimeline data={ell} />
                        </Grid>
                      )
                    })}
                  </Grid>
                </Paper>
              )
            })}
          {isLoading && <TimeLineLoading />}
          {!albumList.length && (
            <NoItemFound mx={3} />
          )}
        </Box>
      </InfiniteScroll>
    </Box>
  )
}
