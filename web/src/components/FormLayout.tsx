import React, { FC } from 'react'
import { Form } from 'formik'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[12],
  },
  form: {
    padding: theme.spacing(6, 3, 3),
  },
  submit: {},
}))

export interface FormLayoutProps {
  title?: string
  subtitle?: string
  isSubmitting: boolean
  submitForm: () => void
}

const FormLayout: FC<FormLayoutProps> = ({
  title,
  subtitle,
  children,
  isSubmitting,
  submitForm,
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Form className={classes.form}>
        {title && (
          <Typography variant="h5" align="center" gutterBottom>
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            gutterBottom
          >
            {subtitle}
          </Typography>
        )}
        <br />

        {children}

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            color="secondary"
            disabled={isSubmitting}
            onClick={submitForm}
            className={classes.submit}
          >
            Envoyer
          </Button>
        </Box>
      </Form>

      {isSubmitting && <LinearProgress />}
    </Paper>
  )
}

export default FormLayout
