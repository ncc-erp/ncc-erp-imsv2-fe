import { Backdrop, CircularProgress } from "@mui/material"
import * as React from "react"

export function BackdropLoading(): JSX.Element {
  return (
    <Backdrop
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open
    >
      <CircularProgress color="primary" />
    </Backdrop>
  )
}
