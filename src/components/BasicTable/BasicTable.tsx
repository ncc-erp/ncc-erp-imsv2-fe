import * as React from "react"
import Paper from "@mui/material/Paper"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import { SizeType } from "@/enums/size"

interface IBasicTableProps {
  size?: string
  columns: string[]
  items: { [key: string]: number | string | null }[]
}

export const BasicTable = ({ size, columns, items }: IBasicTableProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={
        size === SizeType.SMALL
          ? { maxHeight: "550px", overflowY: "scroll" }
          : null
      }
    >
      <Table sx={{ minWidth: 650 }} aria-label="sticky header table" stickyHeader>
        <TableHead>
          <TableRow sx={{ textTransform: "capitalize" }}>
            {columns.map((column: string) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} hover>
              {columns.map((column) => (
                <TableCell key={column}>{item[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
