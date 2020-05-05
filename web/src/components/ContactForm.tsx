import * as React from 'react'
import { Formik, Field } from 'formik'
import Grid from '@material-ui/core/Grid'
import { TextField } from 'formik-material-ui'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Yup from '../libs/Yup'
import FormLayout from './FormLayout'

const useStyles = makeStyles((theme: Theme) => ({
  field: {
    width: `100%`,
  },
}))

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  subject: Yup.string().required(),
  message: Yup.string().required(),
})

interface Values {
  email: string
  firstName: string
  lastName: string
  subject: string
  message: string
}

const initialValues: Values = {
  email: 'test@test.fr',
  firstName: 'Julien',
  lastName: 'Caron',
  subject: 'Message test',
  message: 'Bonjour Nathalie, Super site !',
}

function ContactForm() {
  const classes = useStyles()
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false)
          console.log(JSON.stringify(values, null, 2))
        }, 500)
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <FormLayout
          title="Contactez-moi"
          subtitle="Je vous réponds avec plaisir et rapidement. À très vite !"
          isSubmitting={isSubmitting}
          submitForm={submitForm}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                type="text"
                label="Prénom"
                required
                name="firstName"
                className={classes.field}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                required
                type="text"
                label="Nom"
                name="lastName"
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
            <Grid item xs={12}>
              <Field
                component={TextField}
                required
                type="text"
                label="Sujet"
                name="subject"
                className={classes.field}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                required
                type="text"
                label="Message"
                name="message"
                className={classes.field}
                multiline
                rows={6}
              />
            </Grid>
          </Grid>
        </FormLayout>
      )}
    </Formik>
  )
}

export default ContactForm
