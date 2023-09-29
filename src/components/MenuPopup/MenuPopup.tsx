import * as React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import { ButtonProps } from "@mui/material"

export interface IMenuPopup {
  buttonProps?: ButtonProps
  buttonChildren: React.ReactNode
  MenuChildren: React.ReactNode
}

export default function MenuPopup(props: IMenuPopup) {
  const { buttonProps, buttonChildren, MenuChildren } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div style={{ display: "flex" }}>
      <Button
        id="positioned-button"
        aria-controls={open ? "positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        {...buttonProps}
      >
        {buttonChildren}
      </Button>
      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        {MenuChildren}
      </Menu>
    </div>
  )
}
