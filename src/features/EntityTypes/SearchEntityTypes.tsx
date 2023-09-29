import React from "react"
import SearchIcon from "@mui/icons-material/Search"
import { alpha, styled } from "@mui/material/styles"
import { InputLabel, FormControl, OutlinedInput } from "@mui/material"

interface ISearchEntityTypesProps {
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  setPage: React.Dispatch<React.SetStateAction<number>>
}
const Search = styled(FormControl)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto"
  }
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(0,0,0,0.54)",
}))

const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": { 
    padding: `10px ${theme.spacing(1)}`,
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch"
    }
  }
}))
export default function SearchEntityTypes({
  setSearchText,
  setPage
}: ISearchEntityTypesProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length >= 0) {
      setPage(1)
    }
    setSearchText(event.target.value)
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <InputLabel
        htmlFor="outlined-search-input"
        sx={{ left: "30px", height: 24, top: "-2px" }}
      >
        Search
      </InputLabel>
      <StyledInputBase
        id="outlined-search-input"
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
      />
    </Search>
  )
}
