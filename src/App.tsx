//@ts-ignore: : needs React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import BrailleUI from './views/BrailleUI'
import { createTheme, ThemeProvider } from '@mui/material'
//fonts
import '@fontsource/jua'
import '@fontsource/roboto'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d2d52',
    },
    text: {
      primary: '#0d2d52',
    }
  },
  typography: {
    fontFamily: [
      //'Jua',
      'Roboto',
      'sans-serif'
    ].join(','),
  }
})

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrailleUI/>
      </ThemeProvider>
    </>
  )
}

export default App
