//@ts-ignore: : needs React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ChangeEvent, useState } from 'react'
import { ISerialState } from '../../lib/serial'
import { LinearProgress, Typography } from '@mui/material'

interface IPrintState {
  className?:string
  state:ISerialState
}

const PrintState = (props:IPrintState)=>{
  return (
    <div className={`${props.className?props.className:''}`}>
      <Typography>{`state: ${props.state.state}`}</Typography>
      <LinearProgress variant="determinate" value={props.state.progress} />
    </div>
  )
}

export default PrintState