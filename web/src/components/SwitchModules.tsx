import React, { FC, memo } from 'react'
import uuid from 'uuid/v1'
import loadable from '@loadable/component'
import VisibilitySensor from 'react-visibility-sensor'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'

import { Module } from '../interfaces'
import Section from './Section'
import Quote from './Quote'

// Modules
const BodyPortableText = loadable(() => import('./BodyPortableText'))
const CtaModule = loadable(() => import('./modules/cta'))
const ProjectsModule = loadable(() => import('./modules/projects'))
const CustomersModule = loadable(() => import('./modules/customers'))
const FormationsModule = loadable(() => import('./modules/formations'))
const ServicesModule = loadable(() => import('./modules/services'))
const FeaturesModule = loadable(() => import('./modules/features'))
const HeroModule = loadable(() => import('./modules/hero'))
const LastsPostsModule = loadable(() => import('./modules/lastsPosts'))
const FormModule = loadable(() => import('./modules/formModule'))
const AboutMeModule = loadable(() => import('./modules/AboutMe'))

const Switcher: FC<{ modules?: Module[] }> = ({ modules }) => {
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

            let component = null

            // New way
            switch (props._type) {
              case 'aboutMeModule':
                component = <AboutMeModule {...props} />
                break

              case 'formModule':
                component = <FormModule {...props} />
                break

              case 'ctaModule':
                component = <CtaModule {...props} />
                break

              case 'projectsModule':
                component = <ProjectsModule {...props} />
                break

              case 'customersModule':
                component = <CustomersModule {...props} />
                break

              case 'formationsModule':
                component = <FormationsModule {...props} />
                break

              case 'servicesModule':
                component = <ServicesModule {...props} />
                break

              case 'quote':
                if (!props?.text) {
                  console.warn(`Error with Quote module, missing "text"`)
                  component = null
                } else {
                  component = (
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
                }
                break

              case 'featuresModule':
                component = <FeaturesModule {...props} />
                break

              case 'simplePortableTextModule':
                component = (
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
                break

              case 'heroModule':
                component = <HeroModule {...props} />
                break

              case 'lastsPostsModule':
                component = <LastsPostsModule {...props} />
                break

              default:
                console.warn(`This module hasn't module template`, { module })
                return null
            }

            // Then return component
            if (component) {
              // wrap into simple div to make "isVisible" working
              return <div>{component}</div>
            }
            return null
          }}
        </VisibilitySensor>
      ))}
    </>
  )
}

const SwitchModules = memo(Switcher)

export default SwitchModules
