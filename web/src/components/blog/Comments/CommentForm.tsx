import * as React from 'react'
import { Formik, Field, Form } from 'formik'

import { TextField } from 'formik-material-ui'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import Yup from '../../../libs/Yup'
import { createComment } from './commentsAPI'
import sendMail, { Mail } from '../../../libs/sendMailApi'
import useSiteSettings from '../../../hooks/useSiteSettings'

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
})

const initialValues = {
  email: '',
  username: '',
  message: '',
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
        const { username, email, message } = values

        const res = await createComment({
          username,
          email,
          message,
          post: {
            _ref: postSlug,
          },
        })

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
              <li>Nom : ${username} </li>
              <li>Email : ${email} </li>
            </ul>
            <p>Message :</p>
            <p>${message}</p>
            `,
          }
          await sendMail(mail)
        }

        return !!res
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                type="text"
                label="Nom complet"
                variant="outlined"
                required
                name="username"
                className={classes.field}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                component={TextField}
                type="email"
                label="Email"
                variant="outlined"
                required
                name="email"
                className={classes.field}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                required
                name="message"
                variant="outlined"
                multiline
                rows={4}
                type="text"
                label="Commentaire"
                className={classes.field}
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
