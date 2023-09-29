import React, { Dispatch, SetStateAction, useContext } from "react"
import { styled } from "@mui/material/styles"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import { makeStyles } from "@mui/styles"
import Toolbar from "@mui/material/Toolbar"
import UserMenu from "./UserMenu"
import ToggleButton from "@/assets/images/toggle_button.svg";
import Navbar from "./Navbar"
import { useNavigate } from "react-router"
import { ButtonBase, Theme } from "@mui/material"
import { layoutContext } from "@/context/layoutContext"

import { useLocation } from "react-router-dom"
import { HEADER_HEIGHT } from "@/enums/layout"

type IHeaderProps = {
  setConfigWidget: Dispatch<SetStateAction<boolean>>
  showSidebar: boolean
  setShowSidebar: Dispatch<SetStateAction<boolean>>
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<MuiAppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.appBar,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  backgroundColor: "#fff",
  boxShadow: "none",
  border: "1px solid rgb(224, 224, 227)",
  color: "#cd5c5c",
  height: HEADER_HEIGHT,
  justifyContent: "center"
}))

const useStyles = makeStyles<Theme>((theme) => ({
  headerWrapper: {
    justifyContent: "space-between",
    padding: "0px 8px",
    minHeight: 48
  },
  hidden: {
    display: "none",
  },
  toggleButton: {
    display: "none",
    marginLeft: "16px",
    marginRight: "10px",
    [theme.breakpoints.down("md")]: {
      display: "inline-block"
    }
  },
  adminNavbar: {
    flex: 1
  },
  navbar: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  }
}))

const Header = (props: IHeaderProps) => {
  const { setConfigWidget, setShowSidebar, showSidebar } = props
  const navigate = useNavigate()
  const layoutContextComsume = useContext(layoutContext);
  const { pathname } = useLocation();

  const handleToggleSidebar = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (pathname.includes("admin")) {
      layoutContextComsume.setShowAdminSidebar(showAdminSidebar => !showAdminSidebar)
    } else {
      setShowSidebar(!showSidebar)
    }
  }

  const onClickButtonMenu = () => {
    setShowSidebar(false)
    navigate("/dashboard")
  }

  const styles = useStyles()
  return (
    <AppBar>
      <Toolbar className={styles.headerWrapper}>
        <ButtonBase
          className={styles.toggleButton}
          disableRipple
          onClick={handleToggleSidebar}>
            <img src={ToggleButton} alt="toggle button" />
        </ButtonBase>
        <ButtonBase
          disableRipple
          onClick={onClickButtonMenu}
        >
          <img src="/static/images/logo.svg" alt="logo" />
        </ButtonBase>
        <div className={`${pathname.includes("admin") ? styles.adminNavbar : styles.navbar}`}>
          <Navbar />
        </div>
        <UserMenu setConfigWidget={setConfigWidget} />
      </Toolbar>
    </AppBar>
  )
}
export default Header
