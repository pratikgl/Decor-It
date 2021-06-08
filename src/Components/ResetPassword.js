import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React, { useRef } from 'react'

export default function ResetPassword({ resetPasswordOpen, togglePasswordOpen }) {

  const resetPasswordRef = useRef()

  return (
    <>
      {/* show a dialog box for resetting password */}
      <Dialog
        open={resetPasswordOpen}
        onClose={togglePasswordOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset password enter your email address
          </DialogContentText>
          <TextField
            inputRef={resetPasswordRef}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={togglePasswordOpen} color="primary">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
