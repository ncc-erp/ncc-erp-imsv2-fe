import React from "react"
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent
} from "@mui/material"
import { SELECT } from "@/enums/widget"
import { makeStyles } from "@mui/styles"
import { capitalizeFirstLetter } from "@/utils"

interface ISelectProps {
  items: string[] | null,
  setPage?: React.Dispatch<React.SetStateAction<number>>
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>
  selectedItem: string,
  title?: string,
  showAllOption?: boolean
}
const useStyles = makeStyles({
  selectContainer: {
    display: "flex",
    minWidth: "30%",
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

export function Select({
  items,
  title,
  selectedItem,
  setPage,
  setSelectedItem,
  showAllOption = true
}: ISelectProps) {
  const styles = useStyles()

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setPage?.(1);
    setSelectedItem(event.target.value);
  }

  return (
    <Box className={styles.selectContainer}>
      <FormControl fullWidth className={styles.formControl}>
        <InputLabel id="select-label" htmlFor="select">
          {title}
        </InputLabel>
        <MuiSelect
          labelId="select-label"
          id="select"
          value={selectedItem}
          label="category"
          onChange={handleChangeCategory}
          displayEmpty={false}
          MenuProps={{
            classes: { paper: styles.menuPaper },
            PaperProps: { sx: { maxHeight: SELECT.MAX_HEIGHT }}
          }}
        >
          {showAllOption &&<MenuItem value="ALL">All</MenuItem>}
          {items && items.map((category) => (
            <MenuItem key={category} value={category}>
              {capitalizeFirstLetter(category.toLowerCase())}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </Box>
  )
}