import axios from 'axios'

interface BaseMail {
  to: string
  subject: string
}

interface TextMail extends BaseMail {
  text: string
}

interface HtmlMail extends BaseMail {
  html: string
}

export type Mail = TextMail | HtmlMail

async function sendMail(mailInfo: Mail): Promise<boolean> {
  const url = `/.netlify/functions/sendMail`
  const res = await axios.post(url, mailInfo)
  return res?.statusText === 'OK'
}

export default sendMail
