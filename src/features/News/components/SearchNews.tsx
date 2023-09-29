import React from "react"
import SearchIcon from "@mui/icons-material/Search"
import { FormControl, InputLabel, OutlinedInput } from "@mui/material"

interface ISearchNewsProps {
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  setPage?: React.Dispatch<React.SetStateAction<number>>
  setPage_1?: ()=>void
}

export default function SearchNews({
  setSearchText,
  setPage,
  setPage_1
}: ISearchNewsProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length >= 0) {
      setPage_1 && setPage_1()
      setPage && setPage(1)
    }
    setSearchText(event.target.value)
  }

  return (
    <FormControl
      sx={{
        position: "relative",
        alignSelf: "flex-end",
        flex: 1,
        display: "flex"
      }}
      variant="outlined"
    >
      <SearchIcon
        sx={{
          position: "absolute",
          height: 24,
          width: 24,
          color: "rgba(0,0,0,0.54)",
          top: "50%",
          left: "15px",
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
        autoComplete='off'
        sx={{ pl: "46px", legend: { ml: "30px" } ,
          // same styles for searchs
          '& .MuiInputBase-input': {
            width: '30ch',
            pl: 0,
            pr: '8px'
          }
        }}
        inputProps={{ maxLength: 50 }}
        onChange={handleChange}
      />
    </FormControl>
  )
}
