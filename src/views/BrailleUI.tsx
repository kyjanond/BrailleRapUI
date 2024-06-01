//@ts-ignore: : needs React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import TextInput from '../components/text-input/TextInput'
import Controls from '../components/controls/Controls'
import { IPosition2D, brailleToGCode } from '../lib/script'
import BrailleCanvas from '../components/braille-canvas/BrailleCanvas'
import { gcodeParse } from '../lib/brailleDraw'
import { ISerialState, sendSerial, isSerialCompatible } from '../lib/serial'
import UiAlert, { IUiAlertProps } from '../components/ui-alert/UiAlert'
import './brailleUi.scss'
import UiHeader from '../components/ui-header/UiHeader'
import UiFooter from '../components/ui-footer/UiFooter'
import UiSettings, { IBrailleSettings } from '../components/ui-settings/UiSettings'
import { brailleTableOptions } from '../assets/language-tables/brailleTable'
import PrintState from '../components/print-state/PrintState'

let isPrinting = false

const defaultSettings: IBrailleSettings = {
  tableName: brailleTableOptions[0],
  homeY: false,
  ejectPaper: false,
  velocity: 2000
}

const defualtSerialState: ISerialState = {
  state: 'idle',
  progress: 0
}

const BrailleUI = ()=>{
  const [brailleSettings,setBrailleSettings] = useState(defaultSettings)
  const [text,setText] = useState('')
  const [showSettings,setShowSettings] = useState(false)
  const [gcode,setGcode] = useState('')
  const [paths,setPaths] = useState([] as IPosition2D[])
  const [printState,setPrintState] = useState(defualtSerialState)
  const [alert,setAlert] = useState({
    title: 'ERROR',
    message: '',
    show: false,
    handleClose: ()=>{setAlert({show:false})}
  } as IUiAlertProps)

  const handlePrinterInfo = (info:string)=>{
    console.debug(info)
  }

  const handleTextChanged = (value:string)=>{
    setText(value)
    if (gcode.length > 0){
      setGcode('')
    }
    if (paths.length>0)[
      setPaths([])
    ]
  }
  const handleSendClicked = ()=>{
    if (!isSerialCompatible()){
      const alertProps:IUiAlertProps = {
        title: 'ERROR',
        message: 'Your browser is unfortunatelly not supported. Try new version of MS Edge or Google Chrome.',
        show: true,
        handleClose: ()=>{setAlert({show:false})}
      }
      setAlert(alertProps)
      return
    }
    else if (isPrinting){
      const alertProps:IUiAlertProps = {
        title: 'WARNING',
        message: 'Already printing. Wait!',
        show: true,
        handleClose: ()=>{setAlert({show:false})}
      }
      setAlert(alertProps)
      return
    } else if (gcode.length === 0) {
      const alertProps:IUiAlertProps = {
        title: 'ERROR',
        message: 'There is nothing to print',
        show: true,
        handleClose: ()=>{setAlert({show:false})}
      }
      setAlert(alertProps)
      return
    }
    isPrinting = true
    sendSerial(gcode.split('\n'),9600,handlePrinterInfo,(state:ISerialState)=>setPrintState(state))
      .catch((err:Error)=>{
        const alertProps:IUiAlertProps = {
          title: 'ERROR',
          message: `${err.message}`,
          show: true,
          handleClose: ()=>{setAlert({show:false})}
        }
        setAlert(alertProps)
      })
      .finally(()=>isPrinting=false)
  }
  const handleGenerateClicked = ()=>{
    if (text.length === 0){
      const alertProps:IUiAlertProps = {
        title: 'ERROR',
        message: 'There is no text to generate braille for.',
        show: true,
        handleClose: ()=>{setAlert({show:false})}
      }
      setAlert(alertProps)
    }
    const _gcode = brailleToGCode(text,brailleSettings) || ''
    setGcode(_gcode)
    console.debug(text,_gcode)
    const pathArray = gcodeParse(_gcode)
    setPaths(pathArray)
  }
  const handleSettingsClose = (settings:IBrailleSettings)=>{
    setBrailleSettings(settings)
    setShowSettings(false)
    if (gcode.length > 0){
      setGcode('')
    }
    if (paths.length>0)[
      setPaths([])
    ]
  }
  const handleSettingsClicked = ()=>{
    setShowSettings(true)
  }
  const handleDebugClicked = ()=>{
  }
  return(
    <div>
      <div
        className='br-ui'
      >
        <UiHeader className='br-ui-header'/>
        <div className='br-ui-input'>
          <TextInput className='br-ui-input__text' onChange={(handleTextChanged)}/>
          <BrailleCanvas className='br-ui-input__braille-canvas' dots={paths}/>
        </div>
        <div className='br-ui-controls'>
          <Controls 
            canPrint={gcode.length > 0}
            className='br-ui-controls__btns'
            onSendClicked={handleSendClicked} 
            onGenerateClicked={handleGenerateClicked} 
            onDebugClicked={handleDebugClicked}
            onSettingsClicked={handleSettingsClicked}
          />
          <PrintState className='br-ui-controls__print-state' state={printState}/>
        </div>
        <UiFooter className='br-ui-footer'/>
      </div>
      <UiSettings 
        show={showSettings}
        handleClose={handleSettingsClose} 
        settings={brailleSettings}      
      />
      <UiAlert {...alert}/>
    </div>
  )
}

export default BrailleUI