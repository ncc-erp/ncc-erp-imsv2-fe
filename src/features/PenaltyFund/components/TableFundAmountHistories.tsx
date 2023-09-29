import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  tableCellClasses,
  SelectChangeEvent,
  Theme
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"

import IPagination from "@/components/Pagination/IPagination"
import { IPaginationParams, PAGE_SIZE_LIST } from "@/types/pagination"
import { highlightText } from "@/utils"
import { PenaltyFundColumns } from "@/enums/fundAmountHistories"
import { IAmountHistory } from "@/types/fundAmountHistories"
import { getDateByFormat } from "@/utils/time"
import { TimeFormat } from "@/enums/times"
import { NoItemFound } from "@/components"

interface ITablePenaltyFundProps {
  note: string
  list: IAmountHistory[]
  count: number
  pagination: IPaginationParams
  setPagination: (payload: IPaginationParams) => void
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f8f8f9",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.body1
  }
}))

const useStyles = makeStyles<Theme>((theme) => ({
  pagination: {
    justifyContent: "flex-end",
    gap: 20
  },
  amount: {
    "&.negative-amount": {
      color: theme.palette.error.main
    }
  }
}))

const TableFundAmountHistories = (props: ITablePenaltyFundProps): JSX.Element => {
  const {
    note,
    list,
    count,
    pagination,
    setPagination
  } = props

  const classes = useStyles()

  const handleChangePage = (e: unknown, newPage: number) => {
    setPagination({
      ...pagination,
      page: newPage
    })
  }

  const handleChangeRowsPerPage = (e: SelectChangeEvent) => {
    setPagination({
      ...pagination,
      page: 1,
      size: +e.target.value
    })
  }

  const renderTableRows = () => (
    list.map((item: IAmountHistory, index) => {
      const amountFormatted = item.amount.toLocaleString();
      const isNegativeAmount = item.amount < 0;
      return (
        <TableRow hover key={index}>
          <StyledTableCell sx={{ width: "5%", textAlign: "center" }}>
            {index + 1}
          </StyledTableCell>
          <StyledTableCell sx={{ width: "10%", textAlign: "right" }}>
            <span className={`${classes.amount}${isNegativeAmount ? " negative-amount" : ""}`}>
              {amountFormatted}
            </span>
          </StyledTableCell>
          <StyledTableCell sx={{ width: "20%", textAlign: "center" }}>
            {getDateByFormat(item.date, TimeFormat.DDMMYYYY)}
          </StyledTableCell>
          <StyledTableCell
            dangerouslySetInnerHTML={{ __html: highlightText(item.note, note) }}
          />
        </TableRow>
      )
    })
  )

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", position: "relative" }}>
      <TableContainer sx={{ maxHeight: "calc(100vh - 250px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {PenaltyFundColumns.map((column) => (
                <TableCell
                  key={column}
                  variant="head"
                  sx={{
                    backgroundColor: "#f8f8f9",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableRows()}
          </TableBody>
        </Table>
      </TableContainer>
      {!list.length && (
        <NoItemFound />
      )}
      <IPagination
        count={count}
        defaultPage={1}
        onChange={handleChangePage}
        page={pagination?.page ?? 1}
        className={classes.pagination}
        showFirstButton
        showLastButton
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={PAGE_SIZE_LIST}
        rowsPerPage={pagination?.size ?? PAGE_SIZE_LIST[0]}
      />
    </Paper>
  )
}

export default TableFundAmountHistories
