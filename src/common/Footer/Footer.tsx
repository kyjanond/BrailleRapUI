/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as React from 'react'
import './footer.scss'
import metadata from '../../metadata.json'
import {Typography } from '@mui/material'

export interface IFooterProps {
  visible: boolean
}

const Footer = (props: IFooterProps) => {
  const year = new Date().getFullYear()
  return (
    <span className={`footer ${props.visible?'':'footer--hidden'}`}>
      <Typography className={'footer__content'} variant="caption" color="inherit">
        {`© ${year} ${metadata.copyright} | `}
        <a href='https://opensource.org/license/mit/' target='_blank' rel="noopener noreferrer">MIT License</a>
        {` | ver: ${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision} ${metadata.buildTag} | `}
        <a href={metadata.copyright} target='_blank' rel="noopener noreferrer">github</a>
      </Typography>
      <span className='footer__hidden-content'>
        {`${metadata.datetime}`}
      </span>
    </span>
  )
}
export default Footer