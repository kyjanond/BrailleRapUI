//@ts-ignore: : needs React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ChangeEvent, ReactNode, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  SelectChangeEvent,
} from '@mui/material'
import { brailleTableOptions } from '../../assets/language-tables/brailleTable'

export const BaudRateArray = [
  2400, 9600, 19200, 38400, 57600, 115200, 250000, 500000, 1000000,
]

export interface IBrailleSettings {
  tableName: string
  homeY: boolean
  ejectPaper: boolean
  velocity: number
  restrictSerialPort: boolean
  baudRate: number
}

interface IUiSettings {
  settings: IBrailleSettings
  show: boolean
  handleClose: (settings: IBrailleSettings) => void
}

const UiSettings = (props: IUiSettings) => {
  const [state, setState] = useState(props.settings)
  const handleClose = () => {
    props.handleClose(state)
  }

  const handleBaudRateChanged = (
    event: SelectChangeEvent<number>,
    child: ReactNode
  ) => {
    setState({
      ...state,
      baudRate: event.target.value as number,
    })
  }

  const handleBrailleTableChanged = (
    event: SelectChangeEvent<''>,
    child: ReactNode
  ) => {
    setState({
      ...state,
      tableName: event.target.value,
    })
  }

  const switchChanged = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setState({
      ...state,
      [event.target.name]: checked,
    })
  }

  return (
    <Dialog open={props.show}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: '16px' }}>
          Set print and braille settings.
        </DialogContentText>
        <FormControl fullWidth className="br-ui-settings__drop-down">
          <InputLabel id="braille-table-select-label">Braille Table</InputLabel>
          <Select
            labelId="braille-table-select-label"
            id="braille-table-select"
            // @ts-ignore
            defaultValue={state.tableName}
            // @ts-ignore
            value={state.tableName}
            label="Braille Table"
            onChange={handleBrailleTableChanged}
          >
            {brailleTableOptions.map((element) => {
              return (
                <MenuItem key={element} value={element}>
                  {element}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth className="br-ui-settings__drop-down">
          <InputLabel id="baud-rate-select-label">Baud Rate</InputLabel>
          <Select
            labelId="baud-rate-select-label"
            id="baud-rate-select"
            // @ts-ignore
            defaultValue={state.baudRate}
            // @ts-ignore
            value={state.baudRate}
            label="Baud Rate"
            onChange={handleBaudRateChanged}
          >
            {BaudRateArray.map((element) => {
              return (
                <MenuItem key={element} value={element}>
                  {element}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={state.homeY}
                onChange={switchChanged}
                name="homeY"
              />
            }
            label="load paper in the beginning"
          />
        </FormControl>
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={state.ejectPaper}
                onChange={switchChanged}
                name="ejectPaper"
              />
            }
            label="eject paper when finished"
          />
        </FormControl>
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={state.restrictSerialPort}
                onChange={switchChanged}
                name="restrictSerialPort"
              />
            }
            label="restrict serial port"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Save and exit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UiSettings
