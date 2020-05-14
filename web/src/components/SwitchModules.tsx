import React, { FC } from 'react'
import uuid from 'uuid/v1'
import loadable from '@loadable/component'

import { Module } from '../interfaces'
import Section from './Section'

const BodyPortableText = loadable(() => import('./BodyPortableText'))

// Modules
const CtaModule = loadable(() => import('./modules/cta'))
const ProjectsModule = loadable(() => import('./modules/projects'))
const CustomersModule = loadable(() => import('./modules/customers'))
const FormationsModule = loadable(() => import('./modules/formations'))
const ServicesModule = loadable(() => import('./modules/services'))

const SwitchModules: FC<{ modules?: Module[] }> = ({ modules }) => {
  if (!modules || modules.length <= 0) {
    return null
  }

  return (
    <>
      {modules.map(module => {
        // New way
        switch (module._type) {
          case 'ctaModule':
            return <CtaModule key={uuid()} {...module} />

          case 'projectsModule':
            return <ProjectsModule key={uuid()} {...module} />

          case 'customersModule':
            return <CustomersModule key={uuid()} {...module} />

          case 'formationsModule':
            return <FormationsModule key={uuid()} {...module} />

          case 'servicesModule':
            return <ServicesModule key={uuid()} {...module} />

          case 'simplePortableTextModule':
            return (
              <Section
                key={uuid()}
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
      })}
    </>
  )
}

export default SwitchModules
