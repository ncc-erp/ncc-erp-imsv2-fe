import { IUserRolePermissions } from "@/types"
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import React from "react"
import { IEditUserRolePermissionData } from "."

const useStyles = makeStyles({
  formGroup: {
    "&.MuiFormGroup-root": {
      flexDirection: "row"
    }
  },
  formItem: {
    width: "90px",
    "&.MuiFormControlLabel-root": {
      textTransform: "capitalize"
    }
  },
  roleName: {
    "&.MuiTableCell-root": {
      textTransform: "uppercase",
      fontWeight: "bold",
      marginRight: "10px"
    }
  }
})

interface RolePermissionsProps {
  userRolePermissions: IUserRolePermissions
  editUserRolePermissions: (data: IEditUserRolePermissionData) => void
}

export default function RolePermissions({
  userRolePermissions,
  editUserRolePermissions
}: RolePermissionsProps) {
  const classes = useStyles()

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { name } = e.target
    const [roleName, permissionName] = name.split("-")
    editUserRolePermissions({
      roleName,
      permissionName,
      permissionValue: checked
    })
  }

  return (
    <Table sx={{ minWidth: "480px" }}>
      <TableBody>
        {Object.entries(userRolePermissions).map(
          ([roleName, permissionMetrics]) => {
            return (
              <TableRow key={roleName}>
                <TableCell width="50%" className={classes.roleName}>
                  {roleName}
                </TableCell>
                <TableCell>
                  <FormGroup key={roleName} className={classes.formGroup}>
                    {Object.entries(permissionMetrics).map(
                      ([permissionName, permissionValue]) => {
                        return (
                          <FormControlLabel
                            key={permissionName}
                            className={classes.formItem}
                            control={
                              <Checkbox
                                name={`${roleName}-${permissionName}`}
                                onChange={handleData}
                                checked={permissionValue as boolean}
                              />
                            }
                            label={permissionName}
                          />
                        )
                      }
                    )}
                  </FormGroup>
                </TableCell>
              </TableRow>
            )
          }
        )}
      </TableBody>
    </Table>
  )
}
