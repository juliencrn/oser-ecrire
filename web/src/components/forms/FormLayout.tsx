import React, { FC } from 'react'
import { Form } from 'formik'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'

import { AlertProps } from '../../interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    boxShadow: theme.shadows[3],
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
  alert?: AlertProps
  buttonSecondary?: boolean
}

const FormLayout: FC<FormLayoutProps> = ({
  title,
  subtitle,
  children,
  isSubmitting,
  submitForm,
  alert,
  buttonSecondary,
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
        {alert && (
          <Fade in={!!alert}>
            <Alert severity={alert.type}>{alert.message}</Alert>
          </Fade>
        )}
        <br />

        {children}

        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          flexWrap="wrap"
          mt={3}
        >
          <Button
            variant="contained"
            color={buttonSecondary ? 'secondary' : 'primary'}
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
