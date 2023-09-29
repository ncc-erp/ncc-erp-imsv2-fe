import * as React from 'react'
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Button } from "@mui/material"

interface BasicDialogProps {
  isOpen: boolean,
  title: string,
  content: string | React.ReactNode,
  cancelButtonText?: string,
  confirmButtonText?: string,
  onCancel: React.MouseEventHandler,
  onConfirm: React.MouseEventHandler
}

export const BasicDialog = ({isOpen, title, content, cancelButtonText = 'Cancel', confirmButtonText = 'Oke' ,onCancel, onConfirm}: BasicDialogProps) => (
  <Dialog
    open={isOpen}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>{cancelButtonText}</Button>
      <Button onClick={onConfirm}>
        {confirmButtonText}
      </Button>
    </DialogActions>
  </Dialog>
)
