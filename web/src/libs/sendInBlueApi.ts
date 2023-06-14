import axios from 'axios'
import { AlertProps } from '../interfaces'

// Common variables
const defaultListIds = [3] // Contact - Newsletter Form ID
const apiUrl = 'https://api.brevo.com/v3'
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'api-key': process.env.GATSBY_SENDINBLUE_API_KEY,
}

const errorAlert: AlertProps = {
  type: 'error',
  message: 'Oups ! Il y a eu un problème...',
  isValid: false,
}

export interface ContactProps {
  email: string
  attributes?: {
    NOM?: string
    PRENOM?: string
  }
  listIds?: number[]
}

/**
 * Register new contact in SendInBlue Newsletter API
 *
 * @param props ContactProps
 * @return async Alert
 */
export const registerContact = async (
  props: ContactProps,
): Promise<AlertProps> => {
  const { email, attributes, listIds = defaultListIds } = props
  const data = { email, attributes, listIds, updateEnabled: true }

  try {
    const res = await axios.post(`${apiUrl}/contacts`, data, { headers })
    console.log({ res, data, headers })

    if (res.status < 400) {
      return {
        type: 'success',
        message: 'Le contact a été enregistré.',
        isValid: true,
      }
    }
  } catch (error) {
    console.error(
      `Unable to register ${email} in the SendInBlue/Brevo list.`,
      error,
    )
    console.log('DEBUG: Here the given props', data)
  }
  return errorAlert
}
