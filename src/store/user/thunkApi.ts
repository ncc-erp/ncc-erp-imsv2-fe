import {
  IUsersRes,
  DataUserForm,
  ILoginGoogle,
  IUserLogin,
  IUserProfileRes,
  IUserRole,
  IUserRolePermissions,
  IUpdateUserRolePermissions,
  USER_ROLES_NAME,
  IFulfilledAction
} from "@/types"
import { IUpdateUserRole } from "@/types/users"
import { removeFullToken } from "@/utils/token"
import { userApi } from "@api"
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  PayloadAction
} from "@reduxjs/toolkit"

import { IPaginationParams } from "@/types/pagination"
import { IUserStore } from "."
import { withParamsToastCatcher } from "@/store/ToastCatcher"

export const loginUser = createAsyncThunk(
  "user/login",
  withParamsToastCatcher(async (params: IUserLogin) => {
    return await userApi.login(params)
  }, "Login successfully")
)

export const logoutUser = createAsyncThunk("user/logout", async () => {
  const res = await userApi.logout()
  return res
})

export const getAllUsers = createAsyncThunk("user", async () => {
  const res = await userApi.getAll()
  return res
})

export const addUser = createAsyncThunk(
  "user/addUser",
  async (user: DataUserForm) => {
    await userApi.add(user)
  }
)

export const updateUser = createAsyncThunk(
  "user/roles",
  withParamsToastCatcher(async (userRoles: IUpdateUserRole) => {
    await userApi.updateUserRole(userRoles)
  }, "Update user roles successfully")
)


export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (params: IPaginationParams) => {
    const res = await userApi.getUsers(params)
    return res
  }
)

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async () => {
    const result = await userApi.getUserProfile()
    return result
  }
)

export const getUserRoles = createAsyncThunk("user/getUserRoles", async () => {
  const result = await userApi.getUserRole()
  return result
})

export const getUserRolePermissions = createAsyncThunk(
  "user/getUserRolePermissions",
  async (role: USER_ROLES_NAME) => {
    const result = await userApi.getUserRolePermissions(role)
    return result
  }
)

export const updateUserRolePermissions = createAsyncThunk(
  "user/updateUserRolePermissions",
  async (data: IUpdateUserRolePermissions) => {
    const result = await userApi.updateUserRolePermissions(data)
    return result
  }
)

export const extraReducers = (
  builders: ActionReducerMapBuilder<IUserStore>
) => {
  builders.addCase(
    loginUser.fulfilled,
    (state: IUserStore, action: PayloadAction<ILoginGoogle>) => {
      localStorage.setItem("accessToken", action.payload.accessToken)
      localStorage.setItem("refreshToken", action.payload.refreshToken)
    }
  )

  builders.addCase(logoutUser.fulfilled, () => {
    removeFullToken()
  })
  builders.addCase(
    getAllUsers.fulfilled,
    (state: IUserStore, action: PayloadAction<IUsersRes>) => {
      state.users = action.payload
    }
  )
  builders.addCase(addUser.fulfilled, () => {
    return
  })
  builders.addCase(updateUser.fulfilled, () => {
    return
  })

  builders.addCase(
    getUsers.fulfilled,
    (state: IUserStore, action: PayloadAction<IUsersRes>) => {
      state.users = action.payload
    }
  )
  builders.addCase(
    getUserProfile.fulfilled,
    (state: IUserStore, action: PayloadAction<IUserProfileRes>) => {
      state.userProfile = action.payload
      state.hasLoadedProfile = true
    }
  )
  builders.addCase(
    getUserRoles.fulfilled,
    (state: IUserStore, action: PayloadAction<IUserRole[]>) => {
      state.userRoles = action.payload
    }
  )
  builders.addCase(
    getUserRolePermissions.fulfilled,
    (state: IUserStore, action: PayloadAction<IUserRolePermissions>) => {
      state.userRolePermissions = action.payload
    }
  )
}
