import axios from 'axios'
import { AlertProps } from '../interfaces'

// Common variables
const defaultListIds = [3] // Contact - Newsletter Form ID
const apiUrl = 'https://api.brevo.com/v3'
const headers = {
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
 * Update contact in SendInBlue Newsletter API
 *
 * @param props ContactProps
 * @return async Alert
 */
export const updateContact = async (
  props: ContactProps,
): Promise<AlertProps> => {
  const { email, attributes } = props

  try {
    const data = { attributes }
    const res = await axios.put(`${apiUrl}/contacts/${email}`, data, {
      headers,
    })
    if (res.status < 400) {
      return {
        type: 'success',
        message: 'Le contact a été mis à jour.',
        isValid: true,
      }
    }
  } catch (error) {
    console.error(`Unable to update ${email} in the SendInBlue list.`)
    console.error({ error })
  }
  return errorAlert
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

  try {
    const data = { email, attributes, listIds }
    const res = await axios.post(`${apiUrl}/contacts`, data, { headers })
    if (res.status < 400) {
      return {
        type: 'success',
        message: 'Le contact a été enregistré.',
        isValid: true,
      }
    }
  } catch (error) {
    console.warn(`Unable to register ${email} in the SendInBlue list.`)
    console.log({ error })
    // If contact already exists
    // Try to update this
    if (error?.response?.data?.code === 'duplicate_parameter') {
      console.log(`Try update contact...`)
      const res = await updateContact({ email, attributes })
      return res
    } else {
      console.error(`Unable to register ${email} in the SendInBlue list.`)
      console.error({ error })
    }
  }
  return errorAlert
}
