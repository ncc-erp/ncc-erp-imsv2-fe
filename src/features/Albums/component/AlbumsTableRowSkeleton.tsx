import React, { Fragment } from "react"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { Skeleton } from "@mui/material"

interface IAlbumsTableRowSkeleton {
  rowsNum?: number
}

export const AlbumsTableRowSkeleton = ({
  rowsNum = 5
}: IAlbumsTableRowSkeleton): JSX.Element => {
  return (
    <Fragment>
      {[...Array(rowsNum)].map((_, index) => (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={115}
              height={75}
            />
          </TableCell>
          <TableCell component="th" scope="row">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell component="th" scope="row">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell component="th" scope="row">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton
              animation="wave"
              variant="circular"
              width={20}
              height={20}
              sx={{ display: "table", margin: "auto" }}
            />
          </TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={20}
              height={20}
              sx={{ display: "table", margin: "auto" }}
            />
          </TableCell>
        </TableRow>
      ))}
    </Fragment>
  )
}
