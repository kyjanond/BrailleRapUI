//@ts-ignore: : needs React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as paper from 'paper'
import { IPosition2D, brailleConfig } from '../../lib/script'
import { Paper } from '@mui/material'

export interface IBrailleCanvasProps {
  dots: IPosition2D[],
  className?:string
}

const A4width = brailleConfig.paperWidth 
const radius = 1

const BrailleCanvas = (props:IBrailleCanvasProps)=>{
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [pxMmRatio, setPxMmRatio] = useState(5);
  const [pyMmRatio, setPyMmRatio] = useState(5);

  const handleWindowResize = ()=>{
    const width = ref.current?.clientWidth ?? 1
    const height = ref.current?.clientHeight ?? 1
    setPxMmRatio(width/A4width)
    setPyMmRatio(height/A4width)
    setWidth(width);
    setHeight(height);
  }

  useEffect(() => {
    handleWindowResize()
    paper.setup('braille-canvas')
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(()=>{
    console.debug(height,width,pxMmRatio)
    if (!paper.project){
      return
    }
    paper.project.clear()
    paper.view.viewSize.width = width
    paper.view.viewSize.height = height
    //const pyMmRatio = paper.view.viewSize.height/paper.view.viewSize.width
    props.dots.forEach(dot => {
      const _pt = new paper.Point(
        dot.x * pxMmRatio, 
        dot.y * pxMmRatio
      )
      const dotPath = new paper.Path.Circle(
        _pt, 
        radius * 0.5 * pxMmRatio
      )
      dotPath.fillColor = new paper.Color('black')
    })
  },[props.dots,width,pxMmRatio])

  return(
    <Paper className={props.className} variant="outlined">
      <canvas ref={ref}
        id="braille-canvas"
      />
    </Paper>
  )
}

export default BrailleCanvas