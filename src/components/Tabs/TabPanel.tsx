import { Box, Tab, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles<Theme>((theme) => ({
  tab: {
    fontWeight: "bold",
    alignItems: "flex-start",
    textAlign: "left",
    padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
    "&:hover": {
      color: theme.palette.primary.light
    }
  }
}))

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  }
}
export interface IMSTabPanelProps {
  children?: React.ReactNode
  value: number
}
export default function IMSTabPanel(props: IMSTabPanelProps) {
  const { children, value } = props
  return (
    <div
      role="tabpanel"
      id={`vertical-tabpanel-${value}`}
      aria-labelledby={`vertical-tab-${value}`}
      style={{ flex: 1, height: '100%', overflowY: 'hidden' }}
    >
      <Box sx={{ p: 3, height: '100%' }}>{children}</Box>
    </div>
  )
}
interface LinkTabProps {
  label?: string
  href?: string
}
export function IMSTabLink(props: LinkTabProps) {
  const classes = useStyles()
  const navigate = useNavigate()
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        navigate(props.href as string)
      }}
      className={classes.tab}
      {...a11yProps(1)}
      {...props}
    />
  )
}
