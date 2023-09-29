import { AppDispatch } from "@/store"
import {
  disableWidget,
  enableWidget,
  getAllWidgetsAdmin
} from "@/store/widget/thunkApi"
import { IWidgetRes } from "@/types"
import { Button, TableCell, TableRow, Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { connect } from "react-redux"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import EditIcon from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

export interface IWidgetRowProps {
  widget: IWidgetRes
  onEdit: (widget: IWidgetRes) => void
  index: number
  pGetAllAdminWidgets: () => Promise<unknown>
  pEnableWidget: (id: number) => Promise<unknown>
  pDisableWidget: (id: number) => Promise<unknown>
}

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    width: 60,
    height: 60
  },
  tableCell: {
    fontWeight: "400 !important",
    fontSize: "16px !important",
    color: `${theme.palette.grey[700]} !important`
  },
  text: {
    fontWeight: "600 !important",
    fontSize: `${theme.typography.h5.fontSize} !important`,
    color: `${theme.palette.grey[700]} !important`
  },
  button: {
    minWidth: 36,
    padding: 6
  },
  actionCol: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}))

const DEFAULT_THUMBNAIL =
  "https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg"

function WidgetRow({
  widget,
  index,
  onEdit,
  pGetAllAdminWidgets,
  pEnableWidget,
  pDisableWidget
}: IWidgetRowProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const styles = useStyles()

  const handleEdit = () => {
    onEdit(widget)
    setAnchorEl(null)
  }

  const handleSetEnableOrDisable = async () => {
    if (widget.isEnabled) {
      await pDisableWidget(widget.id)
    } else {
      await pEnableWidget(widget.id)
    }

    await pGetAllAdminWidgets()
    setAnchorEl(null)
  }

  return (
    <TableRow>
      <TableCell className={styles.tableCell} align="center">
        {index + 1}
      </TableCell>
      <TableCell align="center" width={70}>
        <img
          className={styles.img}
          src={widget.thumbnailImage || DEFAULT_THUMBNAIL}
          alt={widget.title}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_THUMBNAIL
          }}
        />
      </TableCell>
      <TableCell>
        <Typography className={styles.text} noWrap>
          {widget.title}
        </Typography>
      </TableCell>
      <TableCell className={styles.tableCell} align="center">
        {widget.isEnabled ? (
          <CheckCircleIcon color="success" />
        ) : (
          <HighlightOffIcon color="error" />
        )}
      </TableCell>
      <TableCell className={styles.tableCell} align="center">
        {widget.defaultWidth}
      </TableCell>
      <TableCell className={styles.tableCell} align="center">
        {widget.defaultHeight}
      </TableCell>
      <TableCell className={styles.tableCell} align="center">
        {widget.maxWidth}
      </TableCell>
      <TableCell className={styles.tableCell} align="center">
        {widget.maxHeight}
      </TableCell>
      <TableCell align="center">
        <div className={styles.actionCol}>
          <Button
            variant="contained"
            onClick={handleEdit}
            className={styles.button}
          >
            <EditIcon />
          </Button>
          <Button
            variant="outlined"
            onClick={handleSetEnableOrDisable}
            className={styles.button}
            sx={{ marginLeft: 2 }}
          >
            {widget.isEnabled ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

const mapDispatchToProp = (dispatch: AppDispatch) => {
  return {
    pGetAllAdminWidgets: () => dispatch(getAllWidgetsAdmin()),
    pEnableWidget: (id: number) => dispatch(enableWidget(id)),
    pDisableWidget: (id: number) => dispatch(disableWidget(id))
  }
}

export default connect(null, mapDispatchToProp)(WidgetRow)
