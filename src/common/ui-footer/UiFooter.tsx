//@ts-ignore: : needs React
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react'
import LogoAlu from '../../assets/images/Logo_ALU.svg'
import LogoAluInv from '../../assets/images/Logo_ALU_invert.svg'
import LogoCST from '../../assets/images/CSTLogo.png'
import LogoFablabCST from '../../assets/images/FabLabCST_Logo.png'
import { Typography } from '@mui/material'

interface IUiHeader {
  className?:string
}

const UiFooter = (props:IUiHeader)=>{
  return(
    <div className={props.className}>
      <div className='br-ui-footer__logo-wrapper'>
        <img
          className='br-ui-footer__logo'
          src={`${LogoAlu}?w=50&h=50&fit=crop&auto=format`}
          srcSet={`${LogoAlu}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
          alt='logo alu'
          loading="lazy"
        />
        <img
          className='br-ui-footer__logo'
          src={`${LogoFablabCST}?w=50&h=50&fit=crop&auto=format`}
          srcSet={`${LogoFablabCST}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
          alt='logo fbalab cst'
          loading="lazy"
        />
        <img
          className='br-ui-footer__logo'
          src={`${LogoCST}?w=50&h=50&fit=crop&auto=format`}
          srcSet={`${LogoCST}?w=50&h=50&fit=crop&auto=format&dpr=2 2x`}
          alt='logo cst'
          loading="lazy"
        />
      </div>
      <div className='br-ui-footer__text-wrapper'>
        <Typography>
          Made by passionate people in Bhutan with love ♡
        </Typography>
      </div>
    </div>
  )
}

export default UiFooter