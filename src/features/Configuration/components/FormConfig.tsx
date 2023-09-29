import { Button, IconButton, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/system"
import React from "react"
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined"

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    position: "relative"
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    position: "relative"
  },
  containerAction: {
    position: "absolute",
    right: 10,
    textAlign: "right",
    "& :nth-child(2)": {
      marginLeft: theme.spacing(2)
    }
  }
}))

export interface IFormConfig {
  children: React.ReactNode
  isEdit: boolean
  title: string
  handleEdit: () => void
  onSubmit: () => void
  onCancel: () => void
}

function FormConfig({
  title,
  isEdit,
  children,
  handleEdit,
  onCancel,
  onSubmit
}: IFormConfig) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4">{title}</Typography>
        {!isEdit && (
          <IconButton
            sx={{ position: "absolute", right: 10 }}
            onClick={handleEdit}
            size="small"
          >
            <BorderColorOutlinedIcon />
          </IconButton>
        )}
      </div>
      <form onSubmit={onSubmit}>
        {children}
        {isEdit && (
          <div className={classes.containerAction}>
            <Button
              sx={{ fontWeight: "bold" }}
              onClick={onCancel}
              variant="outlined"
              color="dark"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}

export default FormConfig
