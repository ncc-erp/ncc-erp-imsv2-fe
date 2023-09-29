import { Theme, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React from "react"

const useStyles = makeStyles<Theme>((theme) => ({
  containerField: {
    display: "flex",
    alignItems: "center",
    width: "90%",
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: `${theme.spacing(2)} 0`,
  },
  label: {
    width: 240,
    padding: `0 ${theme.spacing(2)}`,
    "&.MuiTypography-root": {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  error: {
    color: theme.palette.error.main,
  },
}))

interface ILabelConfig {
  children: React.ReactNode
  label: string
  error?: string
}

function LabelConfig({ children, label, error }: ILabelConfig) {
  const classes = useStyles()
  return (
    <div className={classes.containerField}>
      <Typography className={classes.label} variant="h5">
        {label}
      </Typography>
      <div>
        {children}
        {error && <Typography className={classes.error}>{error}</Typography>}
      </div>
    </div>
  )
}

export default LabelConfig
