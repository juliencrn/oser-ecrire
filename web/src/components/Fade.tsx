import React, { useState, FC } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { useSpring, animated, config } from 'react-spring'

const Fade: FC = ({ children }) => {
  const [isVisible, setVisible] = useState(false)
  const css = useSpring({
    to: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? 'translate3d(0, 0, 0) scale(1)'
        : 'translate3d(0, 0, 0) scale(0.5) ',
    },
    config: config.gentle,
  })

  return (
    <VisibilitySensor
      partialVisibility
      onChange={(visible: boolean) => setVisible(visible)}
    >
      <animated.div style={css}>{children}</animated.div>
    </VisibilitySensor>
  )
}

export default Fade
