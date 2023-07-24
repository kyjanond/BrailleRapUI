//@ts-ignore: : needs React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react'
import * as paper from 'paper'
import { IPosition2D } from '../../lib/script'
import { Paper } from '@mui/material'

export interface IBrailleCanvasProps {
  dots: IPosition2D[],
  className?:string
}

const pxMmRatio = 5
const radius = 1

const BrailleCanvas = (props:IBrailleCanvasProps)=>{
  useEffect(()=>{
    if (!paper.project){
      return
    }
    paper.project.clear()
    //paper.Path.Rectangle(0, 0, Math.max(braille.paperWidth * pixelMillimeterRatio, 0), Math.max(0, braille.paperHeight * pixelMillimeterRatio))
    props.dots.forEach(dot => {
      const dotPath = new paper.Path.Circle(
        new paper.Point(
          dot.x * pxMmRatio, 
          dot.y * pxMmRatio
        ), 
        (radius / 2) * pxMmRatio
      )
      dotPath.fillColor = new paper.Color('black')
    })
  },[props.dots])
  useEffect(()=>{
    paper.setup('braille-canvas')
  },[])
  
  return(
    <Paper className={props.className} variant="outlined">
      <canvas
        id="braille-canvas"
      />
    </Paper>
  )
}

export default BrailleCanvas