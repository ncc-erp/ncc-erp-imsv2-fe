import ErrorIcon from "@mui/icons-material/Error"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material"
import { red } from "@mui/material/colors"
import React, { Dispatch } from "react"
import { DataUser } from "@/types"

export interface IModalDeleteProps {
  user: DataUser | null
  setUser: Dispatch<React.SetStateAction<DataUser | null>>
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  onDelete: (id: number) => Promise<void>
}

export function ModalDelete({
  user,
  setUser,
  open,
  setOpen,
  onDelete,
}: IModalDeleteProps): JSX.Element {
  const handleClose = () => {
    setOpen(false)
    setUser(null)
  }

  const handleDelete = async () => {
    if (user?.id) await onDelete(user.id)

    handleClose()
  }

  return (
    <Dialog open={open} aria-labelledby="draggable-dialog-title">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "8px",
        }}
      >
        <ErrorIcon /> Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            fontWeight: "bold",
          }}
        >
          Are you sure delete
          <Typography
            component="span"
            sx={{
              color: red[500],
              fontWeight: "bold",
            }}
          >
            {`"${user?.userName}"`}
          </Typography>
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          p: "8px 24px 16px",
        }}
      >
        <Button
          onClick={handleClose}
          variant="contained"
          color="error"
          size="small"
        >
          No
        </Button>
        <Button variant="contained" size="small" onClick={handleDelete}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
