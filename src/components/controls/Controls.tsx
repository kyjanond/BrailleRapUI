//@ts-ignore: : needs React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { Button, Select } from '@mui/material'



export interface IControlsProps {
  className?:string
  canPrint: boolean
  onSendClicked: ()=>void
  onGenerateClicked: ()=>void
  onSettingsClicked: ()=>void
  onDebugClicked?: ()=>void
}

const Controls = (props:IControlsProps)=>{
  const handleSend = ()=>{
    props.onSendClicked()
  }

  const handleGenerate = ()=>{
    props.onGenerateClicked()
  }

  const handleSettings = ()=>{
    props.onSettingsClicked()
  }

  const handleDebug = ()=>{
    if (props.onDebugClicked){
      props.onDebugClicked()
    }
  }
  return (
    <div className={`${props.className?props.className:''}`}>
      <Button variant='contained' onClick={handleGenerate}>
        GENERATE
      </Button>
      <Button disabled={!props.canPrint} variant='contained' onClick={handleSend}>
        PRINT
      </Button>
      <Button variant='contained' onClick={handleSettings}>
        SETTINGS
      </Button>
      {/* <Button variant='contained' onClick={handleDebug}>
        DEBUG
      </Button> */}
    </div>
  )
}

export default Controls