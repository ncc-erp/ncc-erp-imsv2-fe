import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material"
import Pagination, { PaginationProps } from "@mui/material/Pagination"
import { useRef, useState } from "react"
import { SELECT } from "@/enums/widget"
import styled from "styled-components"
interface IPaginationProps extends PaginationProps {
  count: number
  defaultPage: number
  onChange: (event: unknown, newPage: number) => void
  page: number
  className: string
  rowsPerPageOptions?: number[]
  rowsPerPage?: number
  onRowsPerPageChange?: (event: SelectChangeEvent) => void
}
const StylePagination = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "20px 0",
  alignItems: "center",
  "&.MuiPaginationItem-root": {
    backgroundColor: "transparent",
    border: "1px solid #dcdee2",
    "&.Mui-selected": {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent"
      }
    },
    "&.MuiSvgIcon-root": {
      color: "#cccccc"
    }
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: 0
  },
  "& .css-vkfmzv-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused":
    {
      boxShadow: "none",
      "& .MuiOutlinedInput-notchedOutline": {
        border: 0
      }
    }
}))

const StyleRowPerPage = styled("div")(() => ({
  display: "flex",
  alignItems: "center"
}))

export default function IPagination({
  count,
  defaultPage,
  onChange,
  page,
  className,
  rowsPerPageOptions = [10, 25, 50],
  rowsPerPage = rowsPerPageOptions[0],
  onRowsPerPageChange,
  ...props
}: IPaginationProps) {
  const [pageSize, setPageSize] = useState<number>(rowsPerPage)

  const handleChange = (event: SelectChangeEvent) => {
    onRowsPerPageChange?.(event)
    setPageSize(+event.target.value)
  }

  return (
    <StylePagination className={className}>
      <StyleRowPerPage>
        <Typography>Rows per page:</Typography>
        <Select
          value={pageSize.toString()}
          onChange={handleChange}
          MenuProps={{ PaperProps: { sx: { maxHeight: SELECT.MAX_HEIGHT } } }}>
          {rowsPerPageOptions.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </StyleRowPerPage>
      <Pagination
        className="mr-4"
        count={count}
        defaultPage={defaultPage}
        onChange={onChange}
        page={page}
        {...props}
      />
    </StylePagination>
  )
}
