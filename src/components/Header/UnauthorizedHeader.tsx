import { styled } from "@mui/material/styles"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import { makeStyles } from "@mui/styles"
import Toolbar from "@mui/material/Toolbar"
import CompanyLocation from "./CompanyLocation"
import { useNavigate } from "react-router"
import { ButtonBase } from "@mui/material"

export const HEADER_HEIGHT = 64

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
  height: HEADER_HEIGHT
}))

const useStyles = makeStyles({
  headerWrapper: {
    justifyContent: "space-between",
    padding: "0px 8px",
    minHeight: 48
  }
})

const UnauthorizedHeader = () => {
  const navigate = useNavigate()

  const styles = useStyles()
  return (
    <AppBar>
      <Toolbar className={styles.headerWrapper}>
        <ButtonBase
          disableRipple
          onClick={() => {
            navigate("/dashboard")
          }}
        >
          <img src="/static/images/logo.svg" alt="logo" />
        </ButtonBase>
        <CompanyLocation />
      </Toolbar>
    </AppBar>
  )
}
export default UnauthorizedHeader
