import { IMSTabLink, IMSTabPanel } from "@/components"
import { ADMIN_ROUTES } from "@/route/admin"
import { AppState } from "@/store"
import { sIsLoading } from "@/store/global/selectors"
import { sGetUserPermissions } from "@/store/user/selector"
import { USER_ROLES_NAME } from "@/types"
import { Box, Tabs, Theme } from "@mui/material"
import { intersection } from "lodash"
import { useEffect, useState, useContext, useMemo } from "react"
import { layoutContext } from "@/context/layoutContext"
import { makeStyles } from "@mui/styles"
import { connect } from "react-redux"
import { IRoute } from "@/types/route"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"

const useStyles = makeStyles<Theme>((theme) => ({
  adminSidebar: {
    [theme.breakpoints.down("md")]: {
      position: "absolute",
      zIndex: 10,
      height: "100%",
      backgroundColor: "#fafafb",
      transform: "translateX(-170px)",
      transition: "transform 0.5s"
    }
  },
  showSidebar: {
    transform: "translateX(0px)"
  },

}))
interface IAdminLayoutProps {
  pIsLoading: boolean
  pUserPermission: string[]
  pHasLoadProfile: boolean
  showSidebar?: boolean
}

function AdminLayout({
  pIsLoading,
  pUserPermission,
  pHasLoadProfile,
  showSidebar = true
}: IAdminLayoutProps) {
  const path = useLocation()
  const [value, setValue] = useState(0)
  const navigate = useNavigate()
  const styles = useStyles();
  const layoutContextComsume = useContext(layoutContext);

  const allowedRoutes = useMemo(() => ADMIN_ROUTES.filter(
    (route: IRoute) => intersection(route.roles, pUserPermission).length),
    [pUserPermission]
  )

  const allowedRoutesPaths = useMemo(
    () => allowedRoutes.map((route: IRoute) => route.path),
    [allowedRoutes]
  );

  const currentPath = useMemo(
    () => path.pathname.split("/")[2],
    [path.pathname]
  );

  useEffect(() => {

    // has load profile and don't enter admin pathname
    if (pHasLoadProfile && !currentPath) {
      navigate(`/admin/${allowedRoutes[0]?.path ?? 'email-setting'}`)
      return
    }

    const index = allowedRoutes.findIndex((item) => item.path === currentPath)
    setValue(index)
  }, [currentPath, allowedRoutes])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    navigate((event.target as HTMLAnchorElement).pathname)
  }

  // guard
  if (
    !pIsLoading &&
    pHasLoadProfile &&
    (!allowedRoutesPaths.length || (!allowedRoutesPaths.includes(currentPath) && !!currentPath))
  ) {
    return <Navigate to={"/forbidden"} />
  }

  return showSidebar ? (
    <div style={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          height: '100%',
          overflowX: "hidden"
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value != -1 && value}
          onChange={handleChange}
          sx={{
            borderRight: 1,
            borderColor: "divider",
            minWidth: 170,
            padding: "12px 0"
          }}
          TabIndicatorProps={{
            sx: {
              backgroundColor: "transparent"
            }
          }}
          className={`
            ${styles.adminSidebar}
            ${layoutContextComsume.showAdminSidebar ? styles.showSidebar : ""}`
          }
        >
          {allowedRoutes.map((page, index) => (
            <IMSTabLink
              key={index}
              label={page.label}
              href={`/admin/${page.path}`}
            />
          ))}
        </Tabs>
        <IMSTabPanel value={value}>
          <Outlet />
        </IMSTabPanel>
      </Box>
    </div>
  ) : <Outlet />
}
const mapStateToProps = (state: AppState) => {
  return {
    pIsLoading: sIsLoading(state),
    pUserPermission: sGetUserPermissions(state),
    pHasLoadProfile: state.user.hasLoadedProfile
  }
}

export default connect(mapStateToProps, null)(AdminLayout)
