import { USER_GENDER, USER_STATUS, USER_TYPE } from "@/enums/users"

export interface IUserLogin {
  googleAuthToken: string
}

export interface DataUserInfo {
  creationTime: Date
  emailAddress: string
  surname: string
  name: string
  isActive: boolean
  userName: string
  password?: string
  confirmPassword?: string
}

export interface DataUserId {
  id: number
}

export interface IUsersRes {
  data: DataUser[],
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  itemCount: number,
  page: number,
  pageCount: number,
  size: number
}

export type DataUser = IUserProfileRes

export interface DataUserForm {
  id?: number
  emailAddress: string
  isActive: boolean
  name: string
  password?: string
  confirmPassword?: string
  surname: string
  userName: string
}

export interface DataUserChecked {
  name: string
  value: number
  isChecked: boolean
}

export interface DataUserTab {
  name: string
  value: string
}

export type DataUserName =
  | "name"
  | "id"
  | "emailAddress"
  | "isActive"
  | "password"
  | "confirmPassword"
  | "surname"
  | "userName"

export interface DataUserFilters {
  search: string
}

export enum UserTabsEnum {
  USER_DETAILS = "1",
  USER_ROLES = "2"
}

export enum UserRolesEnum {
  ADMIN = 1,
  HR,
  CEO,
  INTERN,
  EMPLOYEE,
  PM,
  ROLE_CHECK,
  ROLE_TEST,
  ROLE_FIND,
  ROLE_NAME
}

export enum UserSelectActive {
  ALL = "All",
  ACTIVE = "Active",
  NO_ACTIVE = "No Active"
}

export interface ILoginGoogle {
  accessToken: string
  refreshToken: string
}

export enum USER_ROLES_NAME {
  ADMIN = "Admin",
  HR = "HR",
  STAFF = "Staff",
  INTERN = "Intern"
}

export interface UserRoles {
  id: UserRolesEnum
  name: USER_ROLES_NAME
}

export interface IUserProfileRes {
  id: number
  createdBy: string
  createdTime: string
  updatedBy: string
  updatedTime: string
  deletedBy: number
  deletedTime: string
  isDeleted: boolean
  userName: string
  emailAddress: string
  name: string
  surname: string
  phoneNumber: string
  avatar: string
  komuUserName: string
  userCode: number
  roles: UserRoles[]
  iat: number
  exp: number
}

export interface IUserInformationSelector {
  id: number
  name: string
  surname: string
  avatar: string
}

export interface IUserRole {
  id: number
  name: USER_ROLES_NAME
}

interface IFullPermissions {
  create: boolean
  update: boolean
  read: boolean
  delete: boolean
}

export interface IUserRolePermissions {
  timesheet: IFullPermissions
  hrm: IFullPermissions
  authorization: IFullPermissions
  cms: IFullPermissions
  album: IFullPermissions
  comment: IFullPermissions
  like: IFullPermissions
  widget: IFullPermissions & {
    manage: boolean
  }
  setting: Pick<IFullPermissions, "read" | "update">
  upload_file: Omit<IFullPermissions, "update">
}
export interface IEditCheckBoxUserRolePermissions {
  name: string
  value: boolean
}

export interface IUpdateUserRolePermissions {
  rolePermissions: IUserRolePermissions
  name: string
}

export interface IUpdateUserRole {
  userId: number
  roleNames: USER_ROLES_NAME[]
}

export interface IUserInfo {
  address: string
  bank: string
  bankAccountNumber: string
  bankId: string
  birthday:string
  branch: string
  email: string
  fullName: string
  idCard: string
  insuranceStatus: number
  insuranceStatusName: string
  issuedBy: string
  issuedOn: Date
  jobPosition: string
  level: string
  phone: string
  placeOfPermanent: string
  placeOfResident?: string
  remainLeaveDay: number
  sex: USER_GENDER
  skillNames: string[]
  status: USER_STATUS
  userType: USER_TYPE
  taxCode: string
  teamIds: number[]
  teams: string[]
  statusName: string
  usertypeName: string
}
