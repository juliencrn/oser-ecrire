import * as React from 'react'
import { Formik, Form } from 'formik'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import Yup from '../../../libs/Yup'
import { createComment } from './commentsAPI'
import sendMail, { Mail } from '../../../libs/sendMailApi'
import useSiteSettings from '../../../hooks/useSiteSettings'
import { registerContact } from '../../../libs/sendInBlueApi'
import InputText from '../../forms/InputText'

const useStyles = makeStyles((theme: Theme) => ({
  field: {
    width: `100%`,
    backgroundColor: theme.palette.common.white,
  },
  form: {
    padding: theme.spacing(3, 0),
  },
  submit: {
    marginLeft: 'auto',
    display: 'block',
  },
}))

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  username: Yup.string().required(),
  message: Yup.string().required(),
  newsletter: Yup.boolean(),
})

const initialValues = {
  email: '',
  username: '',
  message: '',
  newsletter: true,
}

export interface CommentsFormProps {
  postSlug: string
  postTitle: string
  onSubmit: () => void
}

function CommentsForm({ postSlug, postTitle, onSubmit }: CommentsFormProps) {
  const classes = useStyles()
  const siteSettings = useSiteSettings()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        const { username, email, message, newsletter } = values

        const res = await createComment({
          username,
          email,
          message,
          post: {
            _ref: postSlug,
          },
        })

        if (newsletter) {
          // Save mail
          await registerContact({
            email,
            attributes: {
              PRENOM: username,
            },
          })
        }

        if (res) {
          resetForm()
          onSubmit() // Refresh comments list

          const mail: Mail = {
            to: siteSettings.email,
            subject: `Nouveau commentaire sur Oser-Ecrire.fr`,
            html: `
            <p>Nouveau commentaire sur oser-ecrire.fr > "${postTitle}" !</p>
            <p>De la part de :</p>
            <ul>
              <li>Prénom : ${username} </li>
              <li>Email : ${email} </li>
            </ul>
            <p>Message :</p>
            <p>${message}</p>
            `,
          }
          sendMail(mail)
        }

        return !!res
      }}
    >
      {({ submitForm, isSubmitting, getFieldProps, getFieldMeta }) => (
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputText
                label="Prénom"
                required
                textFieldProps={{
                  variant: 'outlined',
                }}
                inputProps={{
                  className: classes.field,
                }}
                fieldProps={getFieldProps('username')}
                fieldMeta={getFieldMeta('username')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputText
                label="Email"
                required
                inputProps={{
                  type: 'email',
                  className: classes.field,
                }}
                textFieldProps={{
                  variant: 'outlined',
                }}
                fieldProps={getFieldProps('email')}
                fieldMeta={getFieldMeta('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                label="Commentaire"
                required
                inputProps={{
                  multiline: true,
                  rows: 4,
                  className: classes.field,
                }}
                textFieldProps={{
                  variant: 'outlined',
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
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                onClick={submitForm}
                className={classes.submit}
              >
                Publier
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default CommentsForm
