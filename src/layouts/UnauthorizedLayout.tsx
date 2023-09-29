import { styled } from "@mui/material/styles"
import UnauthorizedHeader, {
  HEADER_HEIGHT
} from "@/components/Header/UnauthorizedHeader"
import { Box, CssBaseline } from "@mui/material"
import { Outlet } from "react-router-dom"

// const DashboardLayoutContainer = styled(Box)(
//   `position: relative;
//   top: ${HEADER_HEIGHT / 2}px;
//   height: calc(100vh - ${HEADER_HEIGHT}px);
//   overflow-y: auto`
// )

const DashboardLayoutContainer = styled(Box)(
  `position: relative;
  height: calc(100vh);
  overflow-y: auto`
)

export default function UnauthorizedLayout() {
  return (
    <DashboardLayoutContainer>
      <CssBaseline />
      {/* <UnauthorizedHeader /> */}
      <Box component="main" id="container">
        <Outlet />
      </Box>
    </DashboardLayoutContainer>
  )
}
