import React, { FC } from 'react'
import uuid from 'uuid/v1'
import loadable from '@loadable/component'
import VisibilitySensor from 'react-visibility-sensor'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'

import { Module } from '../interfaces'
import Section from './Section'
import Quote from './Quote'

const BodyPortableText = loadable(() => import('./BodyPortableText'))

// Modules
const CtaModule = loadable(() => import('./modules/cta'))
const ProjectsModule = loadable(() => import('./modules/projects'))
const CustomersModule = loadable(() => import('./modules/customers'))
const FormationsModule = loadable(() => import('./modules/formations'))
const ServicesModule = loadable(() => import('./modules/services'))
const FeaturesModule = loadable(() => import('./modules/features'))

const SwitchModules: FC<{ modules?: Module[] }> = ({ modules }) => {
  if (!modules || modules.length <= 0) {
    return null
  }

  return (
    <>
      {modules.map(item => (
        <VisibilitySensor partialVisibility key={uuid()}>
          {({ isVisible }) => {
            // console.log(
            //   `Le module ${module._type.replace('Module', '')} n°${
            //     index + 1
            //   } est ${isVisible ? `visible` : `invisible`}`,
            // )

            const props: Module = {
              ...item,
              isVisible,
            }

            // New way
            switch (props._type) {
              case 'ctaModule':
                return (
                  <div>
                    <CtaModule {...props} />
                  </div>
                )

              case 'projectsModule':
                return (
                  <div>
                    <ProjectsModule {...props} />
                  </div>
                )

              case 'customersModule':
                return (
                  <div>
                    <CustomersModule {...props} />
                  </div>
                )

              case 'formationsModule':
                return (
                  <div>
                    <FormationsModule {...props} />
                  </div>
                )

              case 'servicesModule':
                return (
                  <div>
                    <ServicesModule {...props} />
                  </div>
                )

              case 'quote':
                if (!props?.text) {
                  console.warn(`Error with Quote module, missing "text"`)
                  return null
                }
                return (
                  <Container maxWidth="lg">
                    <Box py={8} my={8}>
                      <Fade timeout={1000} in={props?.isVisible}>
                        <div>
                          <Quote author={props?.author}>{props.text}</Quote>
                        </div>
                      </Fade>
                    </Box>
                  </Container>
                )

              case 'featuresModule':
                return (
                  <div>
                    <FeaturesModule {...props} />
                  </div>
                )

              case 'simplePortableTextModule':
                return (
                  <Section
                    title={props?.title}
                    description={props?.introduction}
                    childContainerProps={{
                      maxWidth: 'md',
                    }}
                  >
                    <BodyPortableText blocks={props.body} />
                  </Section>
                )

              default:
                console.warn(`This module hasn't module template`, { module })
                return null
            }
          }}
        </VisibilitySensor>
      ))}
    </>
  )
}

export default SwitchModules
