import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, FormControl, InputLabel, MenuItem, Select, FormControlLabel, FormLabel, Radio, RadioGroup, Switch, SelectChangeEvent } from '@mui/material'
import { brailleTableOptions } from '../../assets/language-tables/brailleTable'
import { ChangeEvent, ReactNode, useState } from 'react'


export interface IBrailleSettings {
  tableName: string,
  homeY: boolean,
  ejectPaper: boolean
  velocity: number
}

interface IUiSettings {
  settings:IBrailleSettings,
  show:boolean,
  handleClose:(settings:IBrailleSettings)=>void,
}

const defaultState: IBrailleSettings = {
  tableName: brailleTableOptions[0],
  homeY: true,
  ejectPaper: true,
  velocity: 2000
}

const UiSettings = (props:IUiSettings)=>{
  const [state, setState] = useState(defaultState)
  const handleClose = ()=>{
    props.handleClose(state)
  }
  const handleBrailleTableChanged = (event: SelectChangeEvent<''>, child: ReactNode)=>{
    setState({
      ...state,
      tableName: event.target.value
    })
  }

  const switchChanged = (event: ChangeEvent<HTMLInputElement>,checked:boolean)=>{
    setState({
      ...state,
      [event.target.name]:checked,
    })
  }

  return(
    <Dialog open={props.show}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{marginBottom:'16px'}}>
            Set print and braille settings.
        </DialogContentText>
        <FormControl fullWidth>
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
            {
              brailleTableOptions.map(element => {
                return <MenuItem key={element} value={element}>{element}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <FormControl>
          <FormControlLabel control={
            <Switch checked={state.homeY} onChange={switchChanged} name='homeY'/>
          } label="load paper in the beginning" />
        </FormControl>
        <FormControl>
          <FormControlLabel control={
            <Switch checked={state.ejectPaper} onChange={switchChanged} name='ejectPaper'/>
          } label="eject paper when finished" />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Save and exit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UiSettings