import React, { ReactNode, useState } from "react"
import { tableCellClasses, Box, TableSortLabel } from "@mui/material"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import { styled } from "@mui/material/styles"
import { longDateTimeFormat } from "@/utils/time"
import { TableRowSkeleton } from "./TableRowSkeleton"
import { ILog, SORT_ENUM } from "@/types"
import { isEmpty } from "lodash"
import { makeStyles } from "@mui/styles"
import Chip from '@mui/material/Chip';
import { METHOD_COLOR } from "@/enums/auditLog"

interface IAuditTableColumn {
  title: string,
  value?: string,
  width?: string,
  isSortAble: boolean
}

interface IAuditTableProps {
  columns: IAuditTableColumn[],
  items: ILog[] | null
  firstLoading: boolean
  order: SORT_ENUM
  setOrder: React.Dispatch<React.SetStateAction<SORT_ENUM>>
  orderBy: string
  setOrderBy: React.Dispatch<React.SetStateAction<string>>
}

const useStyles = makeStyles({
  albumsTableHead: {
    "& th:first-of-type, th:nth-last-of-type(-n + 4)": {
      textAlign: "center"
    }
  },
  albumsTableBody: {
    "& td:first-of-type, td:nth-last-of-type(-n + 4)": {
      textAlign: "center"
    }
  },
  showContent: {
    "& td div": {
      WebkitLineClamp: 'unset'
    }
  }
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  overflow: 'hidden',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f8f8f9",
    color: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.body1
  }
}))

const StyledLongTableCell = styled(StyledTableCell)({
  wordBreak: 'break-all'
})

const StyledLongTableCellContent = styled(Box)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '5',
  WebkitBoxOrient: 'vertical'
})

const checkAndRenderEmpty = (item: unknown): ReactNode => {
  return isEmpty(item) ? '_' : JSON.stringify(item)
}

export const AuditLogTable = React.memo(
  ({
    columns,
    items,
    firstLoading,
    order,
    setOrder,
    orderBy,
    setOrderBy,
  }: IAuditTableProps) => {

    const [activeContent, setActiveContent] = useState<string[]>([])

    const handleChangeSort = (column: string) => {
      setOrderBy(column)
      setOrder(order === SORT_ENUM.asc ? SORT_ENUM.desc : SORT_ENUM.asc)
    }

    const handleToggleContent = (id: string) => {
      setActiveContent((activeContent) => activeContent.includes(id) 
      ? activeContent 
      : [...activeContent, id])
    }
    const styles = useStyles()
    return (
      <TableContainer
        component={Box}
        sx={{
          maxHeight: "calc(100vh - 250px)",
          maxWidth: "calc(100vw - 48px)",
          overflowX: 'auto'
        }}
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label="sticky header table"
          stickyHeader
        >
          <TableHead className={styles.albumsTableHead}>
            <TableRow>
              {columns.map((column: IAuditTableColumn) => (
                <StyledTableCell
                  key={column.title}
                  sx={{ width: column.width || null }}
                >
                  {column.isSortAble ? (
                    <TableSortLabel
                      active={column.value === orderBy}
                      direction={
                        order.toLowerCase() as SORT_ENUM.asc | SORT_ENUM.desc
                      }
                      onClick={() => handleChangeSort(column.value as string)}
                    >
                      {column.title}
                    </TableSortLabel>
                  ) : (
                    column.title
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.albumsTableBody}>
            {firstLoading ? (
              <TableRowSkeleton colsNum={9} />
            ) : (
              items?.map((item, index) => {
                const [name, domain] = item.createdBy.split('@');
                const color = METHOD_COLOR.find(method => method.TYPE === item.method)?.COLOR;
                return (
                  <TableRow key={item.id} hover onClick={() => handleToggleContent(item.id)}
                    className={activeContent.includes(item.id) ? styles.showContent : ''}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>
                      {name}
                      <br />
                      {domain && `@${domain}`}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Chip label={item.method} color={color}
                        variant="outlined" />
                    </StyledTableCell>
                    <StyledLongTableCell>
                      <StyledLongTableCellContent>
                        {checkAndRenderEmpty(item.params)}
                      </StyledLongTableCellContent>
                    </StyledLongTableCell>
                    <StyledLongTableCell>
                      <StyledLongTableCellContent>
                        {item.endpoint}
                      </StyledLongTableCellContent>
                    </StyledLongTableCell>
                    <StyledTableCell>{item.statusCode}</StyledTableCell>
                    <StyledLongTableCell>
                      <StyledLongTableCellContent>
                        {checkAndRenderEmpty(item.exception)}
                      </StyledLongTableCellContent>
                    </StyledLongTableCell>
                    <StyledTableCell>{longDateTimeFormat(item.createdTime)}</StyledTableCell>
                    <StyledTableCell>{item.executionTime}</StyledTableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
)

AuditLogTable.displayName = "Audit Log Table"
