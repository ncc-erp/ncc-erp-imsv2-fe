import { AppDispatch, AppState } from "@/store"
import { sGetUserInform, sIsAdmin, sGetUserPermissions } from "@/store/user/selector"
import { USER_ROLES_NAME } from "@/types"
import { logoutUser } from "@/store/user/thunkApi"
import {
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  PermIdentity as PermIdentityIcon,
  AssignmentInd as AssignmentIndIcon,
} from "@mui/icons-material"
import { Avatar, Box, Button, IconButton, Popover, Collapse } from "@mui/material"
import React, { useEffect, useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import UserProfile from "./UserProfile"
import { isNull } from "lodash"

export const MAX_WIDTH_USER_MENU = 380

const CustomizeButton = styled(Button)(() => ({
  "&.MuiButtonBase-root": {
    justifyContent: "flex-start",
    padding: "12px",
    paddingLeft: 24,
    color: "#262626",
    borderBottom: "2px solid #f5f5f5"
  }
}))

interface IUserMenu extends PropsFromStore {
  setConfigWidget: React.Dispatch<React.SetStateAction<boolean>>
}

const UserMenu = (props: IUserMenu) => {
  const { pLogout, pGetUserInform, pIsAdmin, pUserPermissions, setConfigWidget } = props
  const [isShowMyProfile, setIsShowMyProfile] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const nagivate = useNavigate()

  const handleLogout = async () => {
    await pLogout().then(() => {
      nagivate("/")
    })
  }
  const handleNavigateDashboard = () => {
    nagivate("/dashboard")
    setConfigWidget(true)
    setAnchorEl(null)
  }
  const handleNavigateAdmin = () => {
    setAnchorEl(null)
    // wait for pop over completely disappear before navigate away
    setTimeout(() => nagivate("/admin/manage-news"), 500);
  }
  const handleOpenMyProfile = () => {
    setIsShowMyProfile(true)
  }
  const onCloseUserMenu = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (isNull(anchorEl)) {
      setIsShowMyProfile(false)
    }
  }, [anchorEl])

  const backToUserMenu = () => {
    setIsShowMyProfile(false)
  }

  const closeUserMenu = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Avatar
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ width: 32, height: 32, cursor: "pointer" }}
        alt={pGetUserInform.name}
        src={pGetUserInform.avatar as string}
      />
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={onCloseUserMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          transform: "translateY(10px)"
        }}
      >
        <Collapse in={isShowMyProfile}>
          <UserProfile
            backToUserMenu={backToUserMenu}
            closeUserMenu={closeUserMenu}
          />
        </Collapse>
        <Collapse in={!isShowMyProfile}>
          <Box sx={{
            minWidth: MAX_WIDTH_USER_MENU,
            maxWidth: MAX_WIDTH_USER_MENU
            }}>
            <Box sx={{
              padding: "24px 20px 20px 20px",
              borderBottom: "2px solid #f5f5f5"
            }}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <Avatar
                    sx={{ width: 40, height: 40 }}
                    alt={pGetUserInform.name}
                    src={pGetUserInform.avatar as string}
                  />
                  <div className="pl-2">
                    {pGetUserInform.surname} {pGetUserInform.name}
                  </div>
                </div>
                <IconButton
                  aria-label="Logout"
                  color="primary"
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                </IconButton>
              </div>
            </Box>
            <div>
              <CustomizeButton fullWidth onClick={handleOpenMyProfile}>
                <AssignmentIndIcon fontSize="small" />
                <span className="ml-2">My Profile</span>
              </CustomizeButton>
              {/* open this menu for both hr and admin */}
              {(pUserPermissions.includes(USER_ROLES_NAME.HR) || pUserPermissions.includes(USER_ROLES_NAME.ADMIN)) && (
                <CustomizeButton fullWidth onClick={handleNavigateAdmin}>
                  <PermIdentityIcon fontSize="small" />
                  <span className="ml-2">Admin</span>
                </CustomizeButton>
              )}
              {pIsAdmin && (
                <>
                  <CustomizeButton fullWidth onClick={handleNavigateDashboard}>
                    <DashboardIcon fontSize="small" />
                    <span className="ml-2">Configuration Dashboard</span>
                  </CustomizeButton>
                </>
              )}
            </div>
          </Box>
        </Collapse>
      </Popover>
    </Box>
  )
}

const mapStateToProps = (state: AppState) => ({
  pGetUserInform: sGetUserInform(state),
  pIsAdmin: sIsAdmin(state),
  pUserPermissions: sGetUserPermissions(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    pLogout: () => dispatch(logoutUser())
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromStore = ConnectedProps<typeof connector>

export default connector(UserMenu)
