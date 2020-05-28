import React, { useState } from 'react'
import { Formik } from 'formik'

import Grid from '@material-ui/core/Grid'

import Yup from '../../libs/Yup'
import FormLayout from './FormLayout'
import { registerContact } from '../../libs/sendInBlueApi'
import { AlertProps } from '../../interfaces'
import useSanityForms from '../../hooks/useSanityForms'
import InputText from './InputText'

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  attributes: Yup.object({
    NOM: Yup.string().required(),
    PRENOM: Yup.string().required(),
  }),
})

const initialValues = {
  email: '',
  attributes: {
    NOM: '',
    PRENOM: '',
  },
}

function NewsletterForm() {
  const forms = useSanityForms()
  const { title, subtitle } = forms.filter(
    ({ type }) => type === 'newsletterForm',
  )[0]
  const [alert, setAlert] = useState<AlertProps | undefined>(undefined)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        // Clear previous alert
        if (alert) {
          setAlert(undefined)
        }

        // Try to register/update contact in sendInBlue API
        const { email, attributes } = values
        const newAlert = await registerContact({ email, attributes })

        setAlert(newAlert)
        if (newAlert.isValid) {
          resetForm()
        }

        return newAlert.isValid
      }}
    >
      {({ submitForm, isSubmitting, getFieldProps, getFieldMeta }) => (
        <FormLayout
          title={title}
          subtitle={subtitle}
          isSubmitting={isSubmitting}
          submitForm={submitForm}
          alert={alert}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputText
                label="Prénom"
                required
                fieldProps={getFieldProps('attributes.PRENOM')}
                fieldMeta={getFieldMeta('attributes.PRENOM')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputText
                label="Nom"
                required
                fieldProps={getFieldProps('attributes.NOM')}
                fieldMeta={getFieldMeta('attributes.NOM')}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                label="Email"
                required
                inputProps={{ type: 'email' }}
                fieldProps={getFieldProps('email')}
                fieldMeta={getFieldMeta('email')}
              />
            </Grid>
          </Grid>
        </FormLayout>
      )}
    </Formik>
  )
}

export default NewsletterForm
