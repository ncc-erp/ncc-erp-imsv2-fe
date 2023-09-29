import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  SelectChangeEvent,
  FormControlLabel,
  Checkbox
} from "@mui/material"
import React, { useState } from "react"
import {
  MuiColorInput,
  MuiColorInputValue,
  MuiColorInputColors,
  MuiColorInputFormat
} from "mui-color-input"
import { styled } from "@mui/material/styles"
import { SELECT } from "@/enums/widget"
import { makeStyles } from "@mui/styles"
import { connect } from "react-redux"
import { DataEntityTypesForm, ITableEntityData, NEWS_CATEGORY } from "@/types"
import { AppState } from "@/store"
import {
  updateColor,
  updateDisplayName,
  updateEntityName,
  updateIsActive
} from "@/store/entityTypes"
interface IEntityTypesFromProps {
  pEntityTypeData: DataEntityTypesForm
  updateColor: (color: MuiColorInputValue) => void
  updateDisplayName: (displayName: string) => void
  updateEntityName: (entityName: NEWS_CATEGORY) => void
  updateIsActive: (isActive: boolean) => void
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  pTableEntityTypesData: ITableEntityData
  isEditEntityTypes: boolean
}

const MuiColorInputStyled = styled(MuiColorInput)`
  & .MuiColorInput-AlphaSlider {
    width: 20%;
  }
`
const useStyles = makeStyles({
  root: {
    "& .MuiFormLabel-root": {
      overflow: "unset"
    }
  },
  container: {
    margin: "20px 0",
    width: "100%"
  },
  selectedColor: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  menuPaper: {
    // maxHeight: "35%"
  }
})
const mainCategories = [
  {
    id: NEWS_CATEGORY.EVENTS,
    label: NEWS_CATEGORY.EVENTS
  },
  {
    id: NEWS_CATEGORY.GUIDELINES,
    label: NEWS_CATEGORY.GUIDELINES
  },
  {
    id: NEWS_CATEGORY.NEWS,
    label: NEWS_CATEGORY.NEWS
  },
  {
    id: NEWS_CATEGORY.POLICIES,
    label: NEWS_CATEGORY.POLICIES
  },
  {
    id: NEWS_CATEGORY.TRADITION_ALBUMS,
    label: NEWS_CATEGORY.TRADITION_ALBUMS
  },
  {
    id: NEWS_CATEGORY.WIDGETS,
    label: NEWS_CATEGORY.WIDGETS
  }
]

function EntityTypesFrom({
  pEntityTypeData,
  updateColor,
  updateDisplayName,
  updateEntityName,
  updateIsActive,
  setDisabled,
  pTableEntityTypesData,
  isEditEntityTypes
}: IEntityTypesFromProps) {
  const styles = useStyles()
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [color, setColor] = React.useState(pEntityTypeData?.color || "")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateIsActive(event.target.checked)
  }
  const handleChangeEntityName = (event: SelectChangeEvent) => {
    const isExistsValue = pTableEntityTypesData.data
      .filter(
        (item) => item.entityName === (event.target.value as NEWS_CATEGORY)
      )
      .some((value) => value.displayName === pEntityTypeData.displayName)
    if (isExistsValue) {
      setError(true)
      setDisabled(true)
      setErrorText("Sub Category invalid")
    } else {
      setDisabled(false)
      setError(false)
      setErrorText("")
    }
    updateEntityName(event.target.value as NEWS_CATEGORY)
  }
  const handleChangeColor = (newValue: string, colors: MuiColorInputColors) => {
    setColor(newValue)
    updateColor(newValue)
    setDisabled(false)
  }

  const handleChangeSubCategory = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const displayNameValue = event.target.value
    updateDisplayName(displayNameValue)

    const isExistsValue = pTableEntityTypesData.data
      .filter(
        (item) =>
          item.entityName === pEntityTypeData.entityName &&
          item.id !== pEntityTypeData.id
      )
      .some((value) => value.displayName === displayNameValue)
    if (
      displayNameValue.trim() === "" ||
      displayNameValue.length > 250 ||
      isExistsValue
    ) {
      setErrorText("Sub Category invalid")
      setError(true)
      setDisabled(true)
    } else {
      setDisabled(false)
      setError(false)
      setErrorText("")
    }
  }

  const format: MuiColorInputFormat = "hex8"

  return (
    <Grid
      container
      columnSpacing={{ xs: 0.5, sm: 1, md: 1 }}
      className={styles.container}
    >
      <Grid item md={3} xs={12}>
        <FormControl fullWidth className={styles.root}>
          <InputLabel
            id="demo-simple-select-label"
            htmlFor="demo-simple-select"
          >
            Main Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pEntityTypeData.entityName?.toString()}
            label="entityName"
            onChange={handleChangeEntityName}
            MenuProps={{
              classes: { paper: styles.menuPaper },
              PaperProps: { sx: { maxHeight: SELECT.MAX_HEIGHT }}
            }}
            // can't change main category in edit mode
            disabled={isEditEntityTypes}
            defaultValue={NEWS_CATEGORY.EVENTS}
          >
            {mainCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          fullWidth
          required
          error={error}
          label="Sub Category"
          placeholder="Enter Sub Category"
          inputProps={{ "aria-label": "Sub Category" }}
          className={styles.root}
          onChange={handleChangeSubCategory}
          value={pEntityTypeData.displayName}
          helperText={errorText}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <FormControl>
          <MuiColorInputStyled
            value={color}
            onChange={handleChangeColor}
            format={format}
          />
        </FormControl>
      </Grid>
      <Grid item md={1} xs={12}>
        <FormControl>
          <FormControlLabel
            sx={{ margin: 0 }}
            control={
              <Checkbox
                checked={pEntityTypeData.isActive}
                onChange={handleChange}
              />
            }
            label="Enabled"
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}
const mapStateToProps = (state: AppState) => ({
  pEntityTypeData: state.entityTypes.entityTypeData,
  pTableEntityTypesData: state.entityTypes.tableEntityData
})
const mapDispatchToProps = {
  updateDisplayName: updateDisplayName,
  updateEntityName: updateEntityName,
  updateColor: updateColor,
  updateIsActive: updateIsActive
}
export default connect(mapStateToProps, mapDispatchToProps)(EntityTypesFrom)
