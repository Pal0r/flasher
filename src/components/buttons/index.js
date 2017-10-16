import React from 'react'

import Button from 'react-toolbox/lib/button/Button'

import * as buttonStyles from './button.css'


export const WarningButton = props => (
  <Button {...props} className={buttonStyles.btnWarn}/>
)

export const ErrorButton = props => (
  <Button {...props} className={buttonStyles.btnError}/>
)