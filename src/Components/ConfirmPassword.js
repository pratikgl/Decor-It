import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useRef, useState } from 'react'
import { useAuth } from '../Contexts/AuthContext'

export default function ConfirmPassword({ confirmPasswordOpen, toggleOpen, toggleVerification }) {

  const passwordRef = useRef()
  const { verifyPassword } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setLoading(true)
      await verifyPassword(passwordRef.current.value)
      toggleOpen()
      toggleVerification()
    } catch {
      setMessage('Password verification failed')
    }

    setLoading(false)
  }

  return (
    <>
      {/* show a dialog box for password verification */}
      <Dialog
        open={confirmPasswordOpen}
        onClose={() => {
          toggleOpen()
          setMessage('')
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Password Verification</DialogTitle>
        {
          message ?
            <Alert
              severity='error'
              style={{ marginInline: '24px' }}
            >
              {message}
            </Alert> : null
        }
        <DialogContent>
          <DialogContentText>
            To update your profile verify your current password
          </DialogContentText>
          <TextField
            inputRef={passwordRef}
            autoFocus
            margin="dense"
            id="name"
            label="Current Password"
            type="password"
            required
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleSubmit} color="primary">
            Verify Password
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
