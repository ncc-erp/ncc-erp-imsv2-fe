import {
  getUserRole,
  getUserRolePermissions,
  updateUserRolePermissions
} from "@/api/apiUser"
import { IMSModal } from "@/components"
import { withToastCatcher } from "@/store/ToastCatcher"
import {
  IUpdateUserRolePermissions,
  IUserRolePermissions,
  UserRoles
} from "@/types"
import { useEffect, useState } from "react"
import RolePermissions from "./RolePermissions"
import TableUserRole from "./TableUserRole"

export interface IEditUserRolePermissionData {
  roleName: string
  permissionName: string
  permissionValue: boolean
}

export default function UserRole() {
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleClose = () => {
    setOpen(false)
  }
  const [userRoles, setUserRoles] = useState<UserRoles[]>([])

  const [currentSelectedRole, setCurrentSelectedRole] =
    useState<IUpdateUserRolePermissions | null>(null)

  const handleSelectRole = async (role: UserRoles) => {
    setIsLoading(true)
    const rolePermissions = await getUserRolePermissions(role.name)
    setCurrentSelectedRole({
      name: role.name,
      rolePermissions
    })
    setIsLoading(false)
    setOpen(true)
  }

  const handleSubmit = async () => {
    async function handle() {
      if (!currentSelectedRole) return
      await updateUserRolePermissions(currentSelectedRole)
      setOpen(false)
    }

    withToastCatcher(handle, "Update role permissions successfully")()
  }

  const handleChangeUserRolePermissions = (
    data: IEditUserRolePermissionData
  ) => {
    if (!currentSelectedRole) return
    const { roleName, permissionName, permissionValue } = data
    const rolePermission = currentSelectedRole.rolePermissions

    const newRolePermission: IUserRolePermissions = {
      ...rolePermission,
      [roleName]: {
        ...rolePermission?.[roleName as keyof typeof rolePermission],
        [permissionName]: permissionValue
      }
    }

    setCurrentSelectedRole({
      ...currentSelectedRole,
      rolePermissions: newRolePermission
    })
  }

  useEffect(() => {
    async function getRoles() {
      const res = await getUserRole()
      setUserRoles(res)
    }

    getRoles()
  }, [])

  return (
    <div className="role-page">
      <div className="role-page__container">
        <TableUserRole
          userRoles={userRoles}
          handleSelectRole={handleSelectRole}
        />
      </div>
      <IMSModal
        header={{
          title: "EDIT ROLE PERMISSIONS",
          style: {
            margin: "8px 0 8px 16px"
          }
        }}
        position="CENTER"
        height="80%"
        open={open}
        saveButton={{
          color: "primary",
          onClick: handleSubmit
        }}
        cancelButton={{
          onClick: handleClose,
          color: "dark",
          variant: "outlined"
        }}
      >
        {!isLoading && currentSelectedRole ? (
          <RolePermissions
            editUserRolePermissions={handleChangeUserRolePermissions}
            userRolePermissions={currentSelectedRole?.rolePermissions}
          />
        ) : (
          <div>Loading...</div>
        )}
      </IMSModal>
    </div>
  )
}
