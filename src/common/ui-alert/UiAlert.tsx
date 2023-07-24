//@ts-ignore: : needs React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'


export interface IUiAlertProps {
  className?:string,
  title?:string,
  message?: string,
  show: boolean,
  handleClose?: ()=>void
}

const UiAlert = (props:IUiAlertProps)=>{
  return(
    <Dialog
      className={props.className}
      open={props.handleClose !== undefined && props.show}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText paragraph id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} autoFocus>
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UiAlert