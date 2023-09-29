import {
  Stack,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useEffect, useMemo, useState } from "react"
import moment from "moment"
import { SELECT } from "@/enums/widget"
import useDebounce from "@/utils/useDebounce"
import { getSearchFilter } from "@/api/apiAlbums"

interface Props {
  enteredSearch: string
  setEnteredSearch: React.Dispatch<React.SetStateAction<string>>
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
  year: string
  setYear: React.Dispatch<React.SetStateAction<string>>
}
interface IFilterData {
  category: {
    id: number
    entifyTime: string
    displayName: string
    color: string
  }[]
  year: number[]
}

export default function ActionsTimeLine(props: Props) {
  const { setEnteredSearch, category, setCategory, year, setYear } = props
  const [filterData, setFilterData] = useState<IFilterData | null>(null)
  const [search, setSearch] = useState<string>("")
  const debouncedValue = useDebounce(search, 1000)
  const startYear = 2015
  useEffect(() => {
    const fetchData = async () => {
      const res = await getSearchFilter()
      setFilterData(res)
    }
    fetchData()
  }, [])
  useEffect(() => {
    setEnteredSearch(debouncedValue)
  }, [debouncedValue])
  const handleChangeSearchInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setSearch(value)
  }
  const yearArr: number[] = useMemo(() => {
    const result: number[] = []
    for (let i = moment().year(); i >= startYear; i--) {
      result.push(i)
    }
    return result
  }, [])

  return (
    <Box sx={{ height: 80, width: "100%" }}>
      <Stack
        direction={{ sm: "row", xs: "column" }}
        justifyContent={"space-between"}
        sx={{
          position: "absolute",
          top: 0,
          backgroundColor: "#fafafb",
          px: 3,
          py: 2,
          width: { xl: "80vw", lg: "1152px", md: "100%", sm: "100%", xs: "100%" },
          maxWidth: { xl: "1540px " }
        }}
      >
        <Box
          width={{ sm: "380px", xs: "100%" }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <FormControl
            sx={{ width: "100%", position: "relative" }}
            variant="outlined"
          >
            <SearchIcon
              sx={{
                position: "absolute",
                height: 24,
                width: 24,
                color: "rgba(0,0,0,0.54)",
                top: "50%",
                left: "10px",
                transform: "translate(0,-50%)"
              }}
            />
            <InputLabel
              htmlFor="outlined-search-input"
              sx={{ left: "30px", height: 24, top: "-2px" }}
            >
              Search
            </InputLabel>
            <OutlinedInput
              id="outlined-search-input"
              label="Search"
              sx={{ pl: "30px", legend: { ml: "30px" } }}
              onChange={handleChangeSearchInput}
            />
          </FormControl>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ width: { xl: "20%", sm: "30%", xs: "100%" }, py: 1, px: 0 }}
          gap={1}
        >
          <FormControl sx={{ width: '40%' }}>
            <InputLabel id="year-select-label" htmlFor="year-select">
              Year
            </InputLabel>
            <Select
              labelId="year-select"
              sx={{ width: "100%" }}
              value={year}
              label="Year"
              MenuProps={{ PaperProps: { sx: { maxHeight: SELECT.MAX_HEIGHT } } }}
              onChange={(e) => setYear(e.target.value)}
            >
              <MenuItem value={"0"}>All</MenuItem>
              {yearArr.map((el, index) => (
                <MenuItem key={index} value={el.toString()}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ height: "100%", width: "60%" }}>
            <InputLabel htmlFor="main-category-select">
              Main categories
            </InputLabel>
            <Select
              labelId="main-category-select"
              id="main-category-select"
              value={category}
              MenuProps={{ PaperProps: { sx: { maxHeight: SELECT.MAX_HEIGHT } } }}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={"0"}>All</MenuItem>
              {filterData &&
                filterData.category.map((el) => {
                  return (
                    <MenuItem key={el.id} value={el.id}>
                      {el.displayName}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </Box>
  )
}
