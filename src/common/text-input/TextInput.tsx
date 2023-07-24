//@ts-ignore: : needs React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ChangeEvent, useState } from 'react'
import TextField from '@mui/material/TextField'

export interface ITextInputProps {
  className?:string,
  onChange: (value:string)=>void
}

const TextInput = (props:ITextInputProps)=>{
  const [text,setText] = useState('')
  const handleTextChange = (event:ChangeEvent<HTMLTextAreaElement>)=>{
    props.onChange(event.target.value),
    setText(event.target.value)
  }
  return(
    <TextField
      fullWidth
      className={props.className}
      error={text.length === 0}
      helperText={text.length === 0?'Input is empty':''}
      label="Input"
      multiline
      //size='medium'
      rows={10}
      defaultValue=""
      onChange={handleTextChange}
      inputProps={{
        style: {
          height: '100%',
        },
      }}
    />
  )
}

export default TextInput