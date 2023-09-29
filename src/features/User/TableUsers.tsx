import IPagination from "@/components/Pagination/IPagination"
import { DataUser } from "@/types"
import { IPaginationParams, PAGE_SIZE_LIST } from "@/types/pagination"
import { highlightText } from "@/utils"
import { MouseEvent, useMemo , Dispatch } from "react"
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"

import { SelectChangeEvent } from "@mui/material/Select"
import EditIcon from "@mui/icons-material/Edit"
import { sortBy } from "lodash"
import { NoItemFound } from "@/components"
export interface ITableUsersProps {
  search: string
  users: DataUser[]
  count: number
  columns: string[]
  setAnchorElEdit: Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  searchFilter: IPaginationParams
  setSelectedUser: (user: DataUser) => void
  setSearchFilter: (payload: IPaginationParams) => void
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f8f8f9",
    color: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.body1
  }
}))

const useStyles = makeStyles({
  pagination: {
    justifyContent: "flex-end",
    gap: 20
  },
  tableHeader: {
    "& :last-child": {
      textAlign: "center"
    }
  },
  button: {
    minWidth: 36,
    padding: 6
  },
  actionCol: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12
  }
})

export function TableUsers({
  search,
  searchFilter,
  users,
  columns,
  setAnchorElEdit,
  setSelectedUser,
  setSearchFilter,
  count
}: ITableUsersProps): JSX.Element {
  const classes = useStyles()
  const handleChangeRowsPerPage = (e: SelectChangeEvent) => {
    setSearchFilter({
      ...searchFilter,
      page: 1,
      size: +e.target.value
    })
  }

  const handleChangePage = (e: unknown, newPage: number) => {
    setSearchFilter({
      ...searchFilter,
      page: newPage
    })
  }

  const handleClickEdit = (e: MouseEvent<HTMLButtonElement>, user: DataUser) => {
    setSelectedUser(user)
    setAnchorElEdit(e.currentTarget)
  }

  const orderUserRoleByRoleId = useMemo(() => users.map(user => ({
    ...user,
    roles: sortBy(user.roles, "id")
  })), [users])

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        sx={{
          maxHeight: "calc(100vh - 250px)",
          maxWidth: "calc(100vw - 48px)",
          overflowX: 'auto'
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={classes.tableHeader}>
              {columns.map((column) => (
                <TableCell
                  key={column}
                  variant="head"
                  sx={{
                    backgroundColor: "#f8f8f9",
                    fontWeight: "bold"
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderUserRoleByRoleId.map((user: DataUser, index) => (
              <TableRow hover key={user.id}>
                <StyledTableCell
                  sx={{
                    width: "10%"
                  }}
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    width: "35%"
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlightText(user.emailAddress, search)
                  }}
                />
                <StyledTableCell
                  dangerouslySetInnerHTML={{
                    __html: highlightText(user.name, search)
                  }}
                />
                <StyledTableCell sx={{ width: "30%" }}>
                  <Stack direction="row" spacing={1}>
                    {user.roles.map(role => (
                      <Chip
                        key={role.id}
                        label={role.name}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    width: "10%"
                  }}
                >
                  <div className={classes.actionCol}>
                    <Button
                      variant="contained"
                      className={classes.button}
                      onClick={(e) => handleClickEdit(e, user)}
                    >
                      <EditIcon />
                    </Button>
                  </div>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!orderUserRoleByRoleId.length && (
        <NoItemFound />
      )}
      <IPagination
        count={count}
        defaultPage={1}
        onChange={handleChangePage}
        page={searchFilter?.page ?? 1}
        className={classes.pagination}
        showFirstButton
        showLastButton
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={PAGE_SIZE_LIST}
        rowsPerPage={searchFilter?.size ?? PAGE_SIZE_LIST[0]}
      />
    </Paper>
  )
}
