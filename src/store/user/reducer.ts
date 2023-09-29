import { IEditCheckBoxUserRolePermissions } from "@/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { IUserStore } from "."
export const userReducer = {
  editCheckBoxUserRolePermissions: (
    state: IUserStore,
    action: PayloadAction<IEditCheckBoxUserRolePermissions>
  ) => {
    const userRolePermissions = state.userRolePermissions as any
    const [prefix, suffix] = action.payload.name.split("-")
    userRolePermissions[prefix][suffix] = action.payload.value
    state.userRolePermissions = userRolePermissions
  },
  setRoleName: (state: IUserStore, action: PayloadAction<string>) => {
    state.roleName = action.payload
  },
  setAvatar: (state: IUserStore, action: PayloadAction<string>) => {
    state.userProfile.avatar = action.payload
  }
}
