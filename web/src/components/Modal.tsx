import React, { useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import { TransitionProps } from '@material-ui/core/transitions'
import CloseIcon from '@material-ui/icons/Close'

import SwitchModules from './SwitchModules'
import { Modal as IModal } from '../interfaces'
import useLocalStorage from '../hooks/useLocalStorage'
import useInterval from '../hooks/useInterval'

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

interface ModalStorage {
  count: number
  opened: boolean
  expire: number
}

export default function Modal({ active, delay, modules }: IModal) {
  if (!active) {
    return null
  }

  const classes = useStyles()
  const NOW = new Date().getTime()
  const SECOND = 1000
  const DAY = 24 * 60 * 60 * SECOND

  const initialData: ModalStorage = {
    count: 0,
    opened: false,
    expire: NOW + 30 * DAY,
  }

  const [local, setLocal] = useLocalStorage<ModalStorage>('modal', initialData)
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setLocal({ ...initialData, opened: true })
    setOpen(true)
  }

  const incrementCounter = () => {
    setLocal({ ...local, count: local.count + 1 })
  }

  const handleClose = () => {
    setOpen(false)
  }

  // Wait x secondes cross page before open modal
  useInterval(
    () => {
      local.count < delay ? incrementCounter() : handleOpen()
    },
    local.opened ? null : SECOND,
  )

  // Re-active counter when date expired
  useEffect(() => {
    if (local.expire < NOW) {
      setLocal(initialData)
    }
  }, [])

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      className={classes.modal}
    >
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleClose}
        className={classes.buttonClose}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <SwitchModules modules={modules} />
    </Dialog>
  )
}
