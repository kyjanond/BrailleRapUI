import { IPosition2D } from './script'

export const gcodeParse = (gcode:string)=>{
  const dotArray:IPosition2D[] = []
  const gcodeSplit = gcode.split('\n')
  const moveRe = /G1\sX(\d+\.\d+)\sY(\d+\.\d+)/m
  const dotRg = /M3\sS1/m
  const cursor:IPosition2D = {
    x: 0,
    y: 0
  }
  gcodeSplit.forEach(line => {
    const matches = moveRe.exec(line)
    if(matches?.length === 3){
      cursor.x = parseFloat(matches[1])
      cursor.y = parseFloat(matches[2])
    } else if (line.startsWith('M3 S1')){
      const dot = {x:cursor.x,y:cursor.y}
      dotArray.push(dot)
    }
  })
  return dotArray
}