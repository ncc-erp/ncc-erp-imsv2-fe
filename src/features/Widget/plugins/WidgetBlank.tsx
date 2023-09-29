import { ComingSoon } from "@/assets"
import IMSImage from "@/components/Image/IMSImage"
import { makeStyles } from "@mui/styles"
import React from "react"

const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})

const WidgetBlank = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <IMSImage
        sx={{
          width: 120,
          height: 120
        }}
        mode="circle"
        src={ComingSoon}
      />
    </div>
  )
}

export default WidgetBlank
