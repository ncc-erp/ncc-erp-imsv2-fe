import { ChangeEventHandler } from "react"
import {
  Box,
  styled,
  InputBase,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  IconButton
} from "@mui/material"
import { alpha } from "@mui/material/styles"
import { SELECT } from "@/enums/widget"
import { makeStyles } from "@mui/styles"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from '@mui/icons-material/Close';
import { isEqual } from "lodash"
import { INTERGER } from "@/enums/regex"
import { ComparisonOperators, fundAmountHistoriesFilterParamsDefault } from "@/enums/fundAmountHistories"
import { IFundAmountHistoriesFilterParams, IComparisonOperator } from "@/types"

export interface IFundAmountHistoriesFiltersProps {
  filterParams: IFundAmountHistoriesFilterParams
  handleChangeParams: (filters: IFundAmountHistoriesFilterParams) => void
}

const FilterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  gap: theme.spacing(2),
  marginBottom: "20px",
}))

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  borderColor: alpha(theme.palette.common.black, 0.15),
  borderStyle: "solid",
  borderWidth: 1,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1)
  },
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
  color: alpha(theme.palette.common.black, 0.4)
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch"
    }
  }
}))

const useStyles = makeStyles({
  filterByAmount: {
    width: "200px",
    "& #filter-by-amount": {
      overflow: "unset"
    }
  }
})

const FundAmountHistoriesFilters = (props: IFundAmountHistoriesFiltersProps): JSX.Element => {
  const classes = useStyles()

  const {
    filterParams,
    handleChangeParams
  } = props;

  const { note, amount, comparisonOperator } = filterParams;

  const handleChangeNote: ChangeEventHandler<HTMLInputElement> = (e) => {
    const note = e.target.value;
    handleChangeParams({
      ...filterParams,
      note,
    })
  }

  const handleChangeComparisonOperator = (e: SelectChangeEvent<IComparisonOperator>) => {
    const comparisonOperator = e.target.value as IComparisonOperator;
    handleChangeParams({
      ...filterParams,
      comparisonOperator,
    })
  }

  const handleChangeAmount: ChangeEventHandler<HTMLInputElement> = (e) => {
    const amount = e.target.value;

    // 0 is not allowed in backend
    if(Number(amount) === 0 && amount !== '') {
      return;
    }
    
    // interger validate
    if(!(new RegExp(INTERGER).test(amount))){
      return;
    }

    handleChangeParams({
      ...filterParams,
      amount,
    })
  }

  const handleClear = () => {
    if (isEqual(filterParams, fundAmountHistoriesFilterParamsDefault)) {
      return
    }
    handleChangeParams(fundAmountHistoriesFilterParamsDefault)
  }

  return (
    <FilterBox>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Note"
          inputProps={{ "aria-label": "search" }}
          onChange={handleChangeNote}
          value={note}
        />
      </Search>
      <FormControl className={classes.filterByAmount} fullWidth>
        <InputLabel id="filter-by-amount">Filter by amount</InputLabel>
        <Select<IComparisonOperator>
          labelId="filter-by-amount"
          id="filter-by-amount"
          value={comparisonOperator}
          label="Filter by amount"
          onChange={handleChangeComparisonOperator}
          MenuProps={{ PaperProps: { sx: { maxHeight: SELECT.MAX_HEIGHT } } }}
        >
          {ComparisonOperators.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="text"
        label="Enter amount value"
        value={amount}
        onChange={handleChangeAmount}
      />
      <IconButton onClick={handleClear}>
        <CloseIcon />
      </IconButton>
    </FilterBox>
  )
}

export default FundAmountHistoriesFilters
