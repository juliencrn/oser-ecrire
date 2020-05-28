import React, { useEffect } from 'react'
import loadable from '@loadable/component'

import { Modal as IModal } from '../../interfaces'
import useLocalStorage from '../../hooks/useLocalStorage'
import useInterval from '../../hooks/useInterval'

const ModalComponent = loadable(() => import('./components'))

interface ModalStorage {
  count: number
  opened: boolean
  expire: number
}

export default function Modal({ active, delay, modules }: IModal) {
  if (!active) {
    return null
  }

  const NOW = new Date().getTime()
  const SECOND = 1000
  const DAY = 24 * 60 * 60 * SECOND
  const ratio = 10 // Per reduce call, we run each "ratio" * seconds instead each second

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
    setLocal({ ...local, count: local.count + 1 * ratio })
  }

  const handleClose = () => {
    setOpen(false)
  }

  // Wait x secondes cross page before open modal
  useInterval(
    () => {
      local.count < delay ? incrementCounter() : handleOpen()
    },
    local.opened ? null : SECOND * ratio,
  )

  // Re-active counter when date expired
  useEffect(() => {
    if (local.expire < NOW) {
      setLocal(initialData)
    }
  }, [])

  if (!open || !modules || !modules.length) {
    return null
  }

  return <ModalComponent open={open} onClose={handleClose} modules={modules} />
}
