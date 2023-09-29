import Header from "@/components/Header"
import { AppDispatch, AppState } from "@/store"
import { getUserProfile } from "@/store/user/thunkApi"
import { Box, CssBaseline, Drawer } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { layoutContext } from "@/context/layoutContext"
import { HEADER_HEIGHT } from "@/enums/layout"
import Sidebar from "@/components/Sidebar"
import { sSubCategoryId } from "@/store/news/selector"

interface IMainLayoutProps {
  pGetUserProfile: () => Promise<unknown>
  subCategory: number
}

const DashboardLayoutContainer = styled(Box)(
  `position: relative;
top: ${HEADER_HEIGHT}px;
height: calc(100vh - ${HEADER_HEIGHT}px);
overflow-y: auto`
)

export type ContextType = {
  isConfigWidget: boolean
  setConfigWidget: React.Dispatch<React.SetStateAction<boolean>>
}

const MainLayout = ({
  pGetUserProfile,
  subCategory
}: IMainLayoutProps) => {
  const token = localStorage.getItem("accessToken")
  const { pathname } = useLocation()

  if (!token) return <Navigate to={"/"} />
  const [isConfigWidget, setConfigWidget] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [showAdminSidebar, setShowAdminSidebar] = useState(false)

  useEffect(() => {
    pGetUserProfile()
  }, [])

  const onCloseSidebar = () => {
    setShowSidebar(false)
  }

  useEffect(() => {
    setShowSidebar(false)
  }, [pathname, subCategory]);

  return (
    <DashboardLayoutContainer onClick={() => setShowAdminSidebar(false)}>
      <layoutContext.Provider value={{
        showAdminSidebar,
        setShowAdminSidebar,
      }}>
        <CssBaseline />
        <Header
          setConfigWidget={setConfigWidget}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <Drawer
          anchor="left"
          open={showSidebar}
          onClose={onCloseSidebar}
        >
          <Sidebar />
        </Drawer>
        <Box component="main" id="container" sx={{ height: "100%" }}>
          <Outlet context={{ isConfigWidget, setConfigWidget }} />
        </Box>
      </layoutContext.Provider>
    </DashboardLayoutContainer>
  )
}

const mapStateToProps = (state: AppState) => ({
  subCategory: sSubCategoryId(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    pGetUserProfile: () => dispatch(getUserProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
