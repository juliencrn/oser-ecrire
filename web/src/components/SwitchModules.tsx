import React, { FC } from 'react'
import uuid from 'uuid/v1'
import loadable from '@loadable/component'
import VisibilitySensor from 'react-visibility-sensor'

import { Module } from '../interfaces'
import Section from './Section'

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
      {modules.map((module, index) => (
        <VisibilitySensor partialVisibility key={uuid()}>
          {({ isVisible }) => {
            // console.log(
            //   `Le module ${module._type.replace('Module', '')} n°${
            //     index + 1
            //   } est ${isVisible ? `visible` : `invisible`}`,
            // )

            const props: Module = {
              ...module,
              isVisible,
            }

            // New way
            switch (module._type) {
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

              case 'featuresModule':
                return (
                  <div>
                    <FeaturesModule {...props} />
                  </div>
                )

              case 'simplePortableTextModule':
                return (
                  <Section
                    title={module.title}
                    description={module?.introduction}
                    childContainerProps={{
                      maxWidth: 'md',
                    }}
                  >
                    <BodyPortableText blocks={module.body} />
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
