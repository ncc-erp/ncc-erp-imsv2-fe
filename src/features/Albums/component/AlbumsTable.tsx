import React from "react"
import { tableCellClasses, Button, Box, TableSortLabel } from "@mui/material"
import { makeStyles } from "@mui/styles"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import IMSImage from "@/components/Image/IMSImage"
import { styled } from "@mui/material/styles"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { Edit as EditIcon } from "@mui/icons-material"
import theme from "@/themes"
import { AlbumsTableRowSkeleton } from "./AlbumsTableRowSkeleton"
import { IAlbum, IAlbumTableColumn , SORT_ENUM } from "@/types"
import { AlbumIMSImage } from "./AlbumIMSImage"

import { shortDateFormat } from "@/utils/time"
import Link from '@mui/material/Link';

interface IAlbumsTableProps {
  columns: IAlbumTableColumn[]
  items: IAlbum[] | null
  firstLoading: boolean
  order: SORT_ENUM
  setOrder: React.Dispatch<React.SetStateAction<SORT_ENUM>>
  orderBy: string
  setOrderBy: React.Dispatch<React.SetStateAction<string>>
  onEdit: (id: string) => void
}

const useStyles = makeStyles({
  albumsTableHead: {
    "& th": {
      textAlign: "center"
    },
    "& th:nth-of-type(3)": {
      textAlign: "left"
    },
  },
  albumsTableBody: {
    "& td:nth-last-of-type(-n + 4), td:first-of-type": {
      textAlign: "center"
    }
  }
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f8f8f9",
    color: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.body1
  }
}))

export const AlbumsTable = React.memo(
  ({
    columns,
    items,
    firstLoading,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    onEdit
  }: IAlbumsTableProps) => {
    const handleChangeSort = (column: string) => {
      setOrderBy(column)
      setOrder(order === SORT_ENUM.asc ? SORT_ENUM.desc : SORT_ENUM.asc)
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
          sx={{
            minWidth: 650
           }}
          aria-label="sticky header table"
          stickyHeader
        >
          <TableHead className={styles.albumsTableHead}>
            <TableRow sx={{ textTransform: "capitalize" }}>
              {columns.map((column: IAlbumTableColumn) => (
                <StyledTableCell
                  key={column.title}
                  sx={column.width ? { width: column.width } : null}
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
              <AlbumsTableRowSkeleton />
            ) : (
              items?.map((item, index) => (
                <TableRow key={item.id} hover>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>
                    <AlbumIMSImage
                      mode="rectangle"
                      sx={{ width: 115, aspectRatio: 1.5 }}
                      src={item.thumbnailImage}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link href={item.albumUrl} target="_blank" rel="noreferrer">
                      {item.title}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>
                    {item.category}
                  </StyledTableCell>
                  <StyledTableCell>
                    {shortDateFormat(item.albumTime)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {item.isActive ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <HighlightOffIcon color="error" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      onClick={() => onEdit(item.id.toString())}
                      size="small"
                      sx={{
                        padding: theme.spacing(0.75)
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                  </StyledTableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
)

AlbumsTable.displayName = "Albums Table"
