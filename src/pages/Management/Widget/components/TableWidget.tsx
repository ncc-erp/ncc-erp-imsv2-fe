import { WidgetRow } from "@/pages/Management/Widget/components"
import { IWidgetColumn, IWidgetForm, IWidgetRes } from "@/types"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Dispatch } from "react"

export interface ITableWidgetProps {
  columns: IWidgetColumn[]
  widgets: IWidgetRes[]
  setOpen: Dispatch<React.SetStateAction<boolean>>
  setInitValues: Dispatch<React.SetStateAction<IWidgetForm>>
}

const useStyles = makeStyles<Theme>((theme) => ({
  paperContainer: {
    width: "100%",
    overflow: "hidden"
  },
  responsiveTable: {
    maxHeight: "calc(100vh - 112px)",
    overflowX: 'auto',
    maxWidth: "calc(100vw - 48px - 170px)",
    [theme.breakpoints.down("md")]: {
      maxWidth: "calc(100vw - 48px)",
    }
  }
}))

export function TableWidget({
  columns,
  widgets,
  setOpen,
  setInitValues
}: ITableWidgetProps) {
  const styles = useStyles()

  const handleSetInitValueUpdate = (widget: IWidgetRes) => {
    const editWidget: IWidgetForm = {
      ...widget,
      entityTypeId: 0
    }
    setInitValues(editWidget)
    setOpen(true)
  }

  return (
    <Paper className={styles.paperContainer}>
      <TableContainer
        className={styles.responsiveTable}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              {columns.map((column: IWidgetColumn) => (
                <TableCell key={column.id} align="center">
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {widgets.map((widget: IWidgetRes, i: number) => (
              <WidgetRow
                key={widget.id}
                widget={widget}
                onEdit={handleSetInitValueUpdate}
                index={i}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
