import React from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import { InputProps } from '@material-ui/core/Input'
import { FieldInputProps, FieldMetaProps } from 'formik'

export interface InputTextProps<T> {
  label: string
  required?: boolean
  textFieldProps?: TextFieldProps
  inputProps?: InputProps
  fieldProps: FieldInputProps<T>
  fieldMeta: FieldMetaProps<T>
}

function InputText<T>(props: InputTextProps<T>) {
  const {
    textFieldProps,
    fieldProps,
    fieldMeta,
    label,
    inputProps,
    required,
  } = props
  const { error, touched } = fieldMeta

  const MuiProps: TextFieldProps = {
    ...textFieldProps,
    InputProps: {
      ...textFieldProps?.InputProps,
      ...inputProps,
      required: !!required,
    },
    InputLabelProps: {
      ...textFieldProps?.InputLabelProps,
      required: !!required,
    },
  }

  const hasError = !!error && !!touched

  return (
    <TextField
      id={fieldProps.name}
      label={label}
      error={hasError}
      helperText={hasError && error}
      style={{ width: `100%` }}
      {...fieldProps} // name, onChange, onBlur, value
      {...MuiProps} // Mui Props
    />
  )
}

export default InputText
