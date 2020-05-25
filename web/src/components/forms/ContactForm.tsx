import * as React from 'react'
import { Formik, Field } from 'formik'
import Grid from '@material-ui/core/Grid'
import { TextField, CheckboxWithLabel } from 'formik-material-ui'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Yup from '../../libs/Yup'
import FormLayout from './FormLayout'
import useSanityForms from '../../hooks/useSanityForms'
import { registerContact } from '../../libs/sendInBlueApi'
import useSiteSettings from '../../hooks/useSiteSettings'
import sendMail, { Mail } from '../../libs/sendMailApi'
import { AlertProps } from '../../interfaces'

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
  newsletter: Yup.boolean(),
})

interface Values {
  email: string
  firstName: string
  lastName: string
  subject: string
  message: string
  newsletter?: boolean
}

const initialValues: Values = {
  email: '',
  firstName: '',
  lastName: '',
  subject: '',
  message: '',
  newsletter: true,
}

function ContactForm() {
  const forms = useSanityForms()
  const siteSettings = useSiteSettings()
  const [alert, setAlert] = React.useState<AlertProps | undefined>(undefined)

  const { title, subtitle } = forms.filter(
    ({ type }) => type === 'contactForm',
  )[0]
  const classes = useStyles()
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        const {
          email,
          firstName,
          lastName,
          subject,
          message,
          newsletter,
        } = values

        // Clear previous alert
        if (alert) {
          setAlert(undefined)
        }

        if (newsletter) {
          // Save mail
          await registerContact({
            email,
            attributes: {
              PRENOM: firstName,
              NOM: lastName,
            },
          })
        }

        const mail: Mail = {
          to: siteSettings.email,
          subject: `Nouveau message sur Oser-Ecrire.fr`,
          html: `
          <p>Nouveau message sur oser-ecrire.fr !</p>
          <p>De la part de :</p>
          <ul>
            <li>Npm : ${lastName} </li>
            <li>Prénom : ${firstName} </li>
            <li>Email : ${email} </li>
            <li>Sujet : ${subject} </li>
          </ul>
          <p>Message :</p>
          <p>${message}</p>
          `,
        }

        const res = await sendMail(mail)

        if (res) {
          setAlert({
            type: 'success',
            message: 'Message envoyé',
            isValid: true,
          })
          resetForm()
        } else {
          setAlert({
            type: 'error',
            message: 'Oups il y a eu un problème',
            isValid: true,
          })
        }

        return !!res
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
            <Grid item xs={12}>
              <Field
                component={CheckboxWithLabel}
                name="newsletter"
                type="checkbox"
                Label={{ label: "M'inscrire à la newsletter" }}
              />
            </Grid>
          </Grid>
        </FormLayout>
      )}
    </Formik>
  )
}

export default ContactForm
