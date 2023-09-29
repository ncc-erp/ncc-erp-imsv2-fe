import IPagination from "@/components/Pagination/IPagination"
import { NewsItem } from "@/features/News/components"
import { AppState } from "@/store"
import { sTableData } from "@/store/news/selector"
import { INewsForm, ITableData, RowData } from "@/types"
import { PAGE_SIZE_LIST } from "@/types/pagination"
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"
import { makeStyles } from "@mui/styles"
import { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { connect } from "react-redux"

export interface ITableNewsLatestProps {
  pNews: ITableData
  setPage: React.Dispatch<React.SetStateAction<number>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  rowsPerPage: number
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

function TableNewsLatest({
  setPage,
  pNews,
  rowsPerPage,
  setRowsPerPage
}: ITableNewsLatestProps) {
  const styles = useStyles()

  const { getValues, watch } = useFormContext<INewsForm>()

  const tableData = useMemo(() => {
    const relationNews = getValues("relationNews")
    const relationNewsIds = relationNews?.map(({ id }) => id) ?? []
    const newRowData = (pNews.data as RowData[]).filter(
      (news) => !relationNewsIds.includes(news.id)
    )

    return {
      ...pNews,
      data: newRowData,
      itemCount: pNews.itemCount - (relationNews ?? []).length
    }
  }, [pNews, watch("relationNews")])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (e: SelectChangeEvent) => {
    setRowsPerPage(+e.target.value)
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        sx={{
          maxHeight: "450px"
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align={"left"} style={{ width: 40 }}>
                #
              </StyledTableCell>
              <StyledTableCell align={"left"} style={{ width: 150 }}>
                Thumbnail
              </StyledTableCell>
              <StyledTableCell align={"left"}>
                Title
              </StyledTableCell>
              <StyledTableCell align={"center"} style={{ width: 120 }}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.data.map((row: RowData, i: number) => (
              <NewsItem key={row.id} news={row} index={i} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <IPagination
        count={tableData.pageCount}
        defaultPage={0}
        onChange={handleChangePage}
        page={tableData.page}
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

const mapStateToProps = (state: AppState) => {
  return {
    pNews: sTableData(state),
  }
}

export default connect(mapStateToProps)(TableNewsLatest)
