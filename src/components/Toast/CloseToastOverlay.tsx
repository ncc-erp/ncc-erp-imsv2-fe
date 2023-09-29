import toast from "@/utils/toast"
import { Button } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { SnackbarKey } from "notistack"

interface CloseToastOverlayProps {
  snackbarKey: SnackbarKey
}

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    right: "0",
    top: "0",
    height: "100%",
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer"
  }
}))

export function CloseToastOverlay({ snackbarKey }: CloseToastOverlayProps) {
  const classes = useStyles()
  return (
    <Button
      className={classes.root}
      onClick={() => {
        toast.close(snackbarKey)
      }}
    />
  )
}
