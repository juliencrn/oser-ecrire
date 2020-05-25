/* eslint-disable @typescript-eslint/no-var-requires */
const nodemailer = require('nodemailer')

const isDev = process.env.NODE_ENV !== 'production'

require('dotenv').config({
  path: `.env.${isDev ? 'development' : 'production'}`,
})

async function main(to, subject, text = '', html = '') {
  // Create a SMTP transporter object
  const transporter = nodemailer.createTransport({
    host: 'SSL0.OVH.NET',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.GATSBY_MAIL_ADDRESS,
      pass: process.env.GATSBY_MAIL_PASSWORD,
    },
  })

  // Message object
  const message = {
    from: `Oser Ecrire <${process.env.GATSBY_MAIL_ADDRESS}>`,
    to,
    subject,
    text,
    html,
  }

  const info = await transporter.sendMail(message)

  console.log('Message sent: %s', info.messageId)

  return true
}

exports.handler = async event => {
  const { to, subject, text, html } = JSON.parse(event.body)

  if (!(to && subject && (text || html))) {
    return {
      statusCode: 500,
      body: 'Field missing',
    }
  }

  try {
    const res = await main(to, subject, text, html)
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Cannot send mail' }),
    }
  }
}
