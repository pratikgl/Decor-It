import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useRef, useState } from 'react'
import { useAuth } from '../Contexts/AuthContext'

export default function ResetPassword({ resetPasswordOpen, togglePasswordOpen }) {

  const resetPasswordRef = useRef()
  const { resetPassword } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setLoading(true)
      await resetPassword(resetPasswordRef.current.value)
      setMessage('Check your email and follow the instructions')
    } catch {
      setMessage('Failed to reset password')
    }

    setLoading(false)
  }

  return (
    <>
      {/* show a dialog box for resetting password */}
      <Dialog
        open={resetPasswordOpen}
        onClose={() => {
          togglePasswordOpen()
          setMessage('')
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
        {
          message ?
            <Alert
              severity={message === 'Failed to reset password' ? 'error' : 'success'}
              style={{ marginInline: '24px' }}
            >
              {message}
            </Alert> : null
        }
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
          <Button disabled={loading} onClick={handleSubmit} color="primary">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
