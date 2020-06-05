import React, { FC, memo } from 'react'
import loadable from '@loadable/component'
import VisibilitySensor from 'react-visibility-sensor'

import { Module } from '../interfaces'
import { AnchorItem } from './Anchor'
import { Container } from '@material-ui/core'

const Switcher: FC<{ modules?: Module[] }> = ({ modules }) => {
  if (!modules || modules.length <= 0) {
    return null
  }

  return (
    <>
      {modules.map((item, i) => {
        const fileName = item._type.replace('Module', '')

        const AsyncComponent = loadable<Module>(() =>
          import(`./modules/${fileName}`),
        )

        if (!AsyncComponent) {
          return null
        }

        return (
          <VisibilitySensor partialVisibility key={i}>
            {({ isVisible }) => (
              <div id={item?.slug?.current || ``}>
                <Container maxWidth="lg">
                  <AnchorItem anchor={item?.slug?.current || ``} />
                </Container>
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
