import * as React from 'react'
import { Formik, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

import Yup from '../libs/Yup'
import FormLayout from './FormLayout'

const useStyles = makeStyles((theme: Theme) => ({
  field: {
    width: `100%`,
  },
}))

// const responses = {
//   duplicated: {
//     code: 'duplicate_parameter',
//     message: 'Contact already exist',
//   },
//   success: {
//     id: 10,
//   },
// }

// const headers = {
//   'Content-Type': 'application/json',
//   'api-key': process.env.GATSBY_SENDINBLUE_API_KEY,
// }

// const body = {
//   email: 'thomas.bianchi@emaaail.com',
//   listIds: [3], // Contact - Newsletter Form ID,
//   attributes: {
//     NOM: 'Caron',
//     PRENOM: 'Julien',
//   },
// }

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  attributes: Yup.object({
    NOM: Yup.string().required(),
    PRENOM: Yup.string().required(),
  }),
})

interface Values {
  email: string
  attributes: {
    NOM: string
    PRENOM: string
  }
}

const initialValues: Values = {
  email: 'test@test.fr',
  attributes: {
    NOM: 'Caron',
    PRENOM: 'Julien',
  },
}

function NewsletterForm() {
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
          title="Inscrivez-vous à la newsletter"
          subtitle="Recevez les derniers articles d'Oser Ecrire directement dans votre
boite de réception."
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
