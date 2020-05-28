import * as React from 'react'
import { Formik } from 'formik'

import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import Yup from '../../libs/Yup'
import FormLayout from './FormLayout'
import useSanityForms from '../../hooks/useSanityForms'
import { registerContact } from '../../libs/sendInBlueApi'
import useSiteSettings from '../../hooks/useSiteSettings'
import sendMail, { Mail } from '../../libs/sendMailApi'
import { AlertProps } from '../../interfaces'
import InputText from './InputText'

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
          registerContact({
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
      {({ submitForm, isSubmitting, getFieldProps, getFieldMeta }) => (
        <FormLayout
          title={title}
          subtitle={subtitle}
          isSubmitting={isSubmitting}
          submitForm={submitForm}
          alert={alert}
          buttonSecondary
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputText
                label="Prénom"
                required
                fieldProps={getFieldProps('firstName')}
                fieldMeta={getFieldMeta('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputText
                label="Nom"
                required
                fieldProps={getFieldProps('lastName')}
                fieldMeta={getFieldMeta('lastName')}
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
            <Grid item xs={12}>
              <InputText
                label="Sujet"
                required
                fieldProps={getFieldProps('subject')}
                fieldMeta={getFieldMeta('subject')}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                label="Message"
                required
                inputProps={{
                  multiline: true,
                  rows: 6,
                }}
                fieldProps={getFieldProps('message')}
                fieldMeta={getFieldMeta('message')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!getFieldProps('newsletter').value}
                    onChange={getFieldProps('newsletter').onChange}
                    name="newsletter"
                  />
                }
                label="M'inscrire à la newsletter"
              />
            </Grid>
          </Grid>
        </FormLayout>
      )}
    </Formik>
  )
}

export default ContactForm
