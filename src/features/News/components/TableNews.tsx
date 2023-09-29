import IMSImage from "@/components/Image/IMSImage"
import { ColumnId, StatusType, status } from "@/enums/news"
import { AppState } from "@/store"
import { sTableData } from "@/store/news/selector"
import { SORT_ENUM } from "@/types/common"
import {
  ColumnData,
  INewsUpdate,
  IOrderByTable,
  IReqOrder,
  ITableData,
  RowData,
  IStatusTable
} from "@/types/news"
import { shortDateFormat } from "@/utils/time"
import EditIcon from "@mui/icons-material/Edit"
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import { visuallyHidden } from "@mui/utils"
import React from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"

import IPagination from "@/components/Pagination/IPagination"
import theme from "@/themes"
import { SelectChangeEvent } from "@mui/material/Select"
import { PAGE_SIZE_LIST } from "@/types/pagination"
import { NoItemFound } from "@/components"

type ORDER_TYPE = SORT_ENUM.asc | SORT_ENUM.desc
interface INewsTableProps {
  columns: ColumnData[]
  setPage: React.Dispatch<React.SetStateAction<number>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  rowsPerPage: number
  pTableData: ITableData
  setReqSort: React.Dispatch<React.SetStateAction<IReqOrder>>
}

const setColorStatusText = (theme: Theme, status?: IStatusTable) => {
  if (!status) return theme.palette.common.black

  switch (status) {
    case StatusType.DRAFT:
      return theme.palette.action.disabled
    case StatusType.APPROVED:
      return "#198754"
    case StatusType.HIDDEN:
      return "#dc3545"
    case StatusType.WAITING:
      return "#6c757d"
    default:
      return theme.palette.common.black
  }
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f8f8f9",
    color: theme.palette.common.black,
    padding: 12
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.body1,
    height: 85
  }
}))

const StatusText = styled("span")<{ status: IStatusTable }>(
  ({ theme, status }) => ({
    color: setColorStatusText(theme, status) as string,
    fontWeight: 'bold'
  })
)

const useStyles = makeStyles({
  thumnailImg: {
    display: "block"
  },
  thumnailCol: {
    padding: 8
  },
  pagination: {
    justifyContent: "flex-end",
    gap: 20
  }
})
function TableNews({
  columns,
  setPage,
  setRowsPerPage,
  rowsPerPage,
  pTableData,
  setReqSort,
}: INewsTableProps) {
  const styles = useStyles()
  const [orderBy, setOrderBy] = React.useState<keyof RowData>(ColumnId.CREATED)
  const [order, setOrder] = React.useState<ORDER_TYPE>(SORT_ENUM.desc)

  const navigate = useNavigate()
  const rows = pTableData.data as RowData[]
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleNavigate = (id: number) => {
    navigate(`/admin/manage-news/edit-news/${id}`)
  }
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: IOrderByTable
  ) => {
    const isAsc = orderBy === property && order === SORT_ENUM.asc
    setOrder(isAsc ? SORT_ENUM.desc : SORT_ENUM.asc)
    setOrderBy(property)
    setReqSort({
      direction: isAsc ? SORT_ENUM.DESC : SORT_ENUM.ASC,
      property: property
    })
  }

  const handleChangeRowsPerPage = (e: SelectChangeEvent) => {
    setRowsPerPage(+e.target.value)
    // reset page to 1
    setPage(1)
  }

  const createSortHandler =
    (property: IOrderByTable) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property)
    }
  const renderStatus = status

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
              <StyledTableCell align={"center"} style={{ minWidth: 20 }}>
                #
              </StyledTableCell>
              <StyledTableCell align={"center"} style={{ minWidth: 130 }}>
                Thumbnail
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
              <StyledTableCell align={"center"} style={{ minWidth: 100 }}>
                Status
              </StyledTableCell>
              <StyledTableCell align={"center"} style={{ minWidth: 100 }}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <StyledTableCell align="center" sx={{ width: "20px" }}>
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ width: "8%" }}
                    className={styles.thumnailCol}
                  >
                    <IMSImage
                      mode="rectangle"
                      className={styles.thumnailImg}
                      src={row.thumbnailImage}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: 670 }}>
                    {row.title}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.createdTime ? shortDateFormat(row.createdTime) : ""}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.publishedTime
                      ? shortDateFormat(row.publishedTime)
                      : ""}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StatusText status={row.status}>
                      {status[row.status as StatusType]}
                    </StatusText>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleNavigate(row.id)}
                      size="small"
                      sx={{
                        minWidth: "0px",
                        padding: theme.spacing(0.75)
                      }}
                    >
                      <EditIcon fontSize="small" />
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
        count={pTableData.pageCount}
        defaultPage={0}
        onChange={handleChangePage}
        page={pTableData.page}
        className={styles.pagination}
        showFirstButton
        showLastButton
        rowsPerPageOptions={PAGE_SIZE_LIST}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
      />
    </Paper>
  )
}
const mapStateToProps = (state: AppState) => ({
  pTableData: sTableData(state)
})

export default connect(mapStateToProps)(TableNews)
