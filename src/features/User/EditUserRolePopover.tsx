import { useMemo , Dispatch } from "react"
import {
  Popover,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Button
} from "@mui/material"

import { makeStyles } from "@mui/styles"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { isEqual, sortBy } from "lodash"
import { IUserRole, UserRoles } from "@/types"

interface EditUserRoleProps {
  anchorEl: HTMLButtonElement | null
  userRoles: IUserRole[]
  currentSelectedRoles: UserRoles[]
  setCurrentSelectedRoles: Dispatch<React.SetStateAction<UserRoles[]>>
  currentRolesUser?: UserRoles[]
  onClose: () => void
  handleUpdateUserRole: () => Promise<void>
}

const useStyles = makeStyles({
  popover: {
    transform: "translateX(-10px)"
  },
  popoverContent: {
    minWidth: 200,
    padding: 20,
    "& > h5": {
      marginBottom: 8
    }
  },
  actionCol: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 12
  }
})

const EditUserRolePopover = (props: EditUserRoleProps): JSX.Element => {
  const {
    anchorEl,
    userRoles,
    currentSelectedRoles,
    setCurrentSelectedRoles,
    currentRolesUser,
    onClose,
    handleUpdateUserRole
  } = props

  const classes = useStyles()

  const handleChange = ({ id, name }: UserRoles) => {
    const index = currentSelectedRoles.findIndex((role) => role.name === name)
    if (index === -1) {
      setCurrentSelectedRoles([
        ...currentSelectedRoles,
        {
          id,
          name
        }
      ])
    } else {
      setCurrentSelectedRoles(
        currentSelectedRoles.filter((role) => role.name !== name)
      )
    }
  }

  const isDisableSave = useMemo(
    () => currentRolesUser && isEqual(currentRolesUser, sortBy(currentSelectedRoles, "id")),
    [currentRolesUser, currentSelectedRoles]
  )

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      className={classes.popover}
    >
      <Box className={classes.popoverContent}>
        <Typography variant="h5">{"Edit user's role"}</Typography>
        <form>
          <FormGroup>
            {userRoles.map(({ id, name }, _index) => {
              return (
                <FormControlLabel
                  key={_index}
                  control={
                    <Checkbox
                      name={`${id}-${name}`}
                      onChange={() => handleChange({ id, name })}
                      checked={
                        currentSelectedRoles.findIndex(
                          (role) => role.name === name
                        ) !== -1
                      }
                    />
                  }
                  label={name}
                />
              )
            })}
          </FormGroup>
        </form>
        <div className={classes.actionCol}>
          <Button
            variant="outlined"
            color="error"
            title="Cancel"
            onClick={onClose}
          >
            <CloseIcon />
          </Button>
          <Button
            variant="outlined"
            color="success"
            title="Save"
            disabled={isDisableSave}
            onClick={handleUpdateUserRole}
          >
            <CheckIcon />
          </Button>
        </div>
      </Box>
    </Popover>
  )
}

export default EditUserRolePopover
