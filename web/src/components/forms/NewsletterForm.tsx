import * as React from 'react'
import { Formik, Field } from 'formik'

import { TextField } from 'formik-material-ui'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Yup from '../../libs/Yup'
import FormLayout from './FormLayout'
import { registerContact } from '../../libs/sendInBlueApi'
import { AlertProps } from '../../interfaces'
import useSanityForms from '../../hooks/useSanityForms'

const useStyles = makeStyles((theme: Theme) => ({
  field: {
    width: `100%`,
  },
}))

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
  const classes = useStyles()
  const [alert, setAlert] = React.useState<AlertProps | undefined>(undefined)
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
      {({ submitForm, isSubmitting }) => (
        <FormLayout
          title={title}
          subtitle={subtitle}
          isSubmitting={isSubmitting}
          submitForm={submitForm}
          alert={alert}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                type="text"
                label="Prénom"
                required
                name="attributes.PRENOM"
                className={classes.field}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                required
                type="text"
                label="Nom"
                name="attributes.NOM"
                className={classes.field}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                required
                name="email"
                type="email"
                label="Email"
                className={classes.field}
              />
            </Grid>
          </Grid>
        </FormLayout>
      )}
    </Formik>
  )
}

export default NewsletterForm
