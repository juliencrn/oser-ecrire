import React, { FC, memo } from 'react'
import uuid from 'uuid/v1'
import loadable from '@loadable/component'
import VisibilitySensor from 'react-visibility-sensor'

import { Module } from '../interfaces'

const Switcher: FC<{ modules?: Module[] }> = ({ modules }) => {
  if (!modules || modules.length <= 0) {
    return null
  }

  return (
    <>
      {modules.map(item => {
        const fileName = item._type.replace('Module', '')

        const AsyncComponent = loadable<Module>(() =>
          import(`./modules/${fileName}`),
        )

        if (!AsyncComponent) {
          return null
        }

        return (
          <VisibilitySensor partialVisibility key={uuid()}>
            {({ isVisible }) => (
              <div>
                <AsyncComponent isVisible={isVisible} {...item} />
              </div>
            )}
          </VisibilitySensor>
        )
      })}
    </>
  )
}

const SwitchModules = memo(Switcher)

export default SwitchModules
