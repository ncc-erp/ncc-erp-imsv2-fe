import { createSlice } from "@reduxjs/toolkit"
import {
  IUsersRes,
  IUserProfileRes,
  IUserRole,
  IUserRolePermissions,
} from "@/types"
import { extraReducers } from "./thunkApi"
import { userReducer } from "./reducer"

export interface IUserStore {
  token: string
  refreshToken: string
  users: IUsersRes
  errorMessage: string
  userProfile: IUserProfileRes
  userRoles: IUserRole[]
  userRolePermissions: IUserRolePermissions
  hasLoadedProfile: boolean
  roleName: string
}
const fullPermissions = {
  create: false,
  update: false,
  read: false,
  delete: false,
}
const initialState: IUserStore = {
  token: "",
  refreshToken: "",
  users: {
    data: [],
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    page: 0,
    pageCount: 0,
    size: 10
  },
  errorMessage: "",
  userProfile: {
    id: NaN,
    createdBy: "",
    createdTime: "",
    updatedBy: "",
    updatedTime: "",
    deletedBy: NaN,
    deletedTime: "",
    isDeleted: false,
    userName: "",
    emailAddress: "",
    name: "",
    surname: "",
    phoneNumber: "",
    avatar: "",
    komuUserName: "",
    userCode: NaN,
    roles: [],
    iat: NaN,
    exp: 0,
  },
  userRoles: [],
  userRolePermissions: {
    timesheet: { ...fullPermissions },
    hrm: { ...fullPermissions },
    authorization: { ...fullPermissions },
    cms: { ...fullPermissions },
    album: { ...fullPermissions },
    comment: { ...fullPermissions },
    like: { ...fullPermissions },
    widget: {
      ...fullPermissions,
      manage: false,
    },
    setting: {
      read: false,
      update: false,
    },
    upload_file: {
      read: false,
      create: false,
      delete: false,
    },
  },
  hasLoadedProfile: false,
  roleName: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: userReducer,
  extraReducers: extraReducers,
})
export const {
  editCheckBoxUserRolePermissions,
  setRoleName,
  setAvatar,
} = userSlice.actions
export default userSlice.reducer
