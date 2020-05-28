import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import { TransitionProps } from '@material-ui/core/transitions'
import CloseIcon from '@material-ui/icons/Close'

import SwitchModules from '../SwitchModules'
import { Module } from '../../interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    position: 'relative',
  },
  buttonClose: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />
})

export interface ModalProps {
  onClose: () => void
  open: boolean
  modules: Module[]
}

function ModalComponent({ onClose, modules, open }: ModalProps) {
  const classes = useStyles()
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      className={classes.modal}
    >
      <IconButton
        edge="start"
        color="inherit"
        onClick={onClose}
        className={classes.buttonClose}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <SwitchModules modules={modules} />
    </Dialog>
  )
}

export default ModalComponent
