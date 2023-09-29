import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  tableCellClasses
} from "@mui/material"
import React from "react"
import { makeStyles } from "@mui/styles"
import { styled } from "@mui/material/styles"
import { visuallyHidden } from "@mui/utils"
import { AppState } from "@/store"
import { connect } from "react-redux"
import { SORT_ENUM } from "@/types/common"
import EditIcon from "@mui/icons-material/Edit"
import {
  ColumnEntityData,
  DataEntityTypesForm,
  IOrderByTableEntity,
  IReqOrderEntity,
  ITableEntityData
} from "@/types/entityTypes"
import { ColumnId } from "@/enums/entityTypes"
import { updateData } from "@/store/entityTypes"
import CircleIcon from "@mui/icons-material/Circle"
import IPagination from "@/components/Pagination/IPagination"
import { SelectChangeEvent } from "@mui/material/Select"
import { PAGE_SIZE_LIST } from "@/types/pagination"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { NoItemFound } from "@/components"

type ORDER_TYPE = SORT_ENUM.asc | SORT_ENUM.desc
interface INewsTableProps {
  columns: ColumnEntityData[]
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  pTableEntityTypesData: ITableEntityData
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  setReqSort: React.Dispatch<React.SetStateAction<IReqOrderEntity>>
  setisEditEntityTypes: React.Dispatch<React.SetStateAction<boolean>>
  setShowModalEntityTypes: React.Dispatch<React.SetStateAction<boolean>>
  updateData: (data: DataEntityTypesForm) => void
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
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
  }
})
function TableEntity({
  columns,
  setPage,
  setReqSort,
  pTableEntityTypesData,
  setisEditEntityTypes,
  setShowModalEntityTypes,
  updateData,
  setDisabled,
  rowsPerPage,
  setRowsPerPage
}: INewsTableProps) {
  const styles = useStyles()
  const [orderBy, setOrderBy] = React.useState<keyof DataEntityTypesForm>(
    ColumnId.SUBCATEGORIES
  )
  const [order, setOrder] = React.useState<ORDER_TYPE>(SORT_ENUM.asc)

  const rows = pTableEntityTypesData.data

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleonClick = (id: number | undefined, data: DataEntityTypesForm) => {
    updateData(data)
    setisEditEntityTypes(true)
    setShowModalEntityTypes(true)
    setDisabled(false)
  }

  const handleChangeRowsPerPage = (e: SelectChangeEvent) => {
    setRowsPerPage(+e.target.value)
    // reset active page to 1
    setPage(1);
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: IOrderByTableEntity
  ) => {
    const isAsc = orderBy === property && order === SORT_ENUM.asc
    setOrder(isAsc ? SORT_ENUM.desc : SORT_ENUM.asc)
    setOrderBy(property)
    setReqSort({
      direction: isAsc ? SORT_ENUM.DESC : SORT_ENUM.ASC,
      property: property
    })
  }
  const createSortHandler =
    (property: IOrderByTableEntity) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property)
    }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{
        maxHeight: "calc(100vh - 250px)",
        maxWidth: "calc(100vw - 48px)",
        overflowX: 'auto'
      }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align={"left"} style={{ minWidth: 20 }}>
                #
              </StyledTableCell>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : SORT_ENUM.asc}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                    {orderBy === column.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === SORT_ENUM.desc
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
              <StyledTableCell
                align={"left"}
                style={{ minWidth: 20, width: "10%" }}
              >
                Color
              </StyledTableCell>
              <StyledTableCell
                align={"left"}
                style={{ minWidth: 20, width: "10%" }}
              >
                Active
              </StyledTableCell>
              <StyledTableCell align={"left"} style={{ minWidth: 100 }}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <StyledTableCell align="left" sx={{ width: "20px" }}>
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.displayName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.entityName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <CircleIcon
                      sx={{ color: row.color ? `${row.color}` : "transparent" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.isActive ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <HighlightOffIcon color="error" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Button
                      variant="contained"
                      onClick={() => handleonClick(row.id, row)}
                      size="small"
                      sx={{ padding: "5px", minWidth: 36 }}
                      color="primary"
                    >
                      <EditIcon />
                    </Button>
                  </StyledTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {!rows.length && (
        <NoItemFound />
      )}
      <IPagination
        count={pTableEntityTypesData.pageCount}
        defaultPage={0}
        onChange={handleChangePage}
        page={pTableEntityTypesData.page}
        className={styles.pagination}
        showFirstButton
        showLastButton
        rowsPerPageOptions={PAGE_SIZE_LIST}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
const mapStateToProps = (state: AppState) => ({
  pTableEntityTypesData: state.entityTypes.tableEntityData
})
const mapDispatchToProps = {
  updateData: updateData
}
export default connect(mapStateToProps, mapDispatchToProps)(TableEntity)
