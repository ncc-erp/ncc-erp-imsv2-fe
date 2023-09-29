import { Fragment } from "react"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { Skeleton } from "@mui/material"

interface IAlbumsTableRowSkeleton {
  rowsNum?: number,
  colsNum?: number
}

export const TableRowSkeleton = ({
  rowsNum = 5, colsNum = 5
}: IAlbumsTableRowSkeleton): JSX.Element => {
  return (
    <Fragment>
      {[...Array(rowsNum)].map((_, index) => (
        <TableRow key={index}>
          {[...Array(colsNum)].map((_, index) => (
            <TableCell component="th" scope="row" key={index}>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          ))}
        </TableRow>
      ))}
    </Fragment>
  )
}
