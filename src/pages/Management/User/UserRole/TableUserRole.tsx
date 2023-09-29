import theme from "@/themes"
import { IUserRole } from "@/types"
import { Edit as EditIcon } from "@mui/icons-material"
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow
} from "@mui/material"
import { styled as muiStyled } from "@mui/material/styles"
interface TableUserRoleProps {
  handleSelectRole: (data: IUserRole) => void
  userRoles: IUserRole[]
}

export default function TableUserRole({
  handleSelectRole,
  userRoles
}: TableUserRoleProps) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <CustomizeTableCell>Id</CustomizeTableCell>
            <CustomizeTableCell>Role Name</CustomizeTableCell>
            <CustomizeTableCell>Action</CustomizeTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userRoles.map((user) => (
            <TableRow hover key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  sx={{
                    minWidth: "0px",
                    padding: theme.spacing(0.75)
                  }}
                  onClick={() => handleSelectRole(user)}
                >
                  <EditIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

const CustomizeTableCell = muiStyled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f8f8f9",
    fontWeight: "bold"
  }
}))
