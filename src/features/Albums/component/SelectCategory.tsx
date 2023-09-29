import React from "react"
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material"
import { SELECT } from "@/enums/widget"
import { makeStyles } from "@mui/styles"
import { ICategory } from "@/types"
import { toInteger } from "lodash"

interface ISelectProps {
  categories: ICategory[] | null,
  setPage?: React.Dispatch<React.SetStateAction<number>>
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>
  selectedCategory?: number
}
const useStyles = makeStyles({
  selectContainer: {
    display: "flex",
    minWidth: "15%",
    "@media screen and (max-width: 1024px)": {
      minWidth: "150px"
    },
    "@media screen and (max-width: 640px)": {
      flexDirection: "column",
      gap: 15,
      minWidth: "100%"
    }
  },
  formControl: {
    minWidth: "20%"
  },
  menuPaper: {
    maxHeight: "20%"
  }
})

export function SelectCategory({
  setPage,
  setSelectedCategory,
  selectedCategory,
  categories
}: ISelectProps) {
  const styles = useStyles()

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setPage?.(1);
    setSelectedCategory(toInteger(event.target.value));
  }

  return (
    <Box className={styles.selectContainer}>
      <FormControl fullWidth className={styles.formControl}>
        <InputLabel id="select-label" htmlFor="select">
          Main Categories
        </InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={categories ? (selectedCategory as number).toString() : ""}
          label="category"
          onChange={handleChangeCategory}
          displayEmpty={false}
          MenuProps={{
            classes: { paper: styles.menuPaper },
            PaperProps: { sx: { maxHeight: SELECT.MAX_HEIGHT }}
          }}
        >
          <MenuItem key={-1} value={-1}>
            All
          </MenuItem>
          {categories && categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}