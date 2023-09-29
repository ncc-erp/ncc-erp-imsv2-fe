import SearchIcon from "@mui/icons-material/Search"
import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  styled
} from "@mui/material"
import { alpha } from "@mui/material/styles"
import { SELECT } from "@/enums/widget"
import { startCase } from "lodash"
import { ChangeEventHandler } from "react"
import { UserRoles } from "@/types/users"
import Box from "@mui/material/Box/Box"
import { makeStyles } from "@mui/styles"
export interface IUserFiltersProps {
  allRoles: UserRoles[]
  search: string
  setSearch: (search: string) => void
  roleFilter: number
  setRoleFilter: (role: number) => void
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch"
    }
  }
}))

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  roleFilter: {
    width: "100px"
  }
})

export function UserFilter({
  allRoles = [],
  search,
  setSearch,
  roleFilter,
  setRoleFilter
}: IUserFiltersProps): JSX.Element {
  const classes = useStyles()

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value)
  }

  const handleRoleFilter = (e: SelectChangeEvent<number>) => {
    setRoleFilter(Number(e.target.value) || -1)
  }

  return (
    <Box className={classes.container}>
      <Search variant="outlined">
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
          onChange={handleSearch}
          value={search}
        />
      </Search>
      <FormControl className={classes.roleFilter} fullWidth>
        <InputLabel id="select-role">Roles</InputLabel>
        <Select<number>
          labelId="select-role"
          id="select-role"
          value={roleFilter}
          label="roles"
          onChange={handleRoleFilter}
          MenuProps={{ PaperProps: { sx: { maxHeight: SELECT.MAX_HEIGHT } } }}
        >
          <MenuItem value={-1}>All</MenuItem>
          {allRoles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {startCase(role.name)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
