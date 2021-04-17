const { SMTP, SERVER } = require('../../config/mail'),
  smtpTransport = require('nodemailer-smtp-transport'),
  nodemailer = require('nodemailer'),
  { generateTemplate } = require('../../utils/generateTemplate'),
  path = require('path'),
  EMAIL_COMPANY_NAME = process.env.EMAIL_COMPANY_NAME

var transporter = nodemailer.createTransport(smtpTransport({
  service: SMTP.service,
  host: SMTP.host,
  port: SMTP.port,
  auth: {
    user: SMTP.auth.user,
    pass: SMTP.auth.pass
  }
}));

module.exports = {
  sendEmail: async (host,id, email, token) => {
    // const link = `http:\\${SERVER.host}:${SERVER.port}\\user\\confirm?token=${token}&id=${id}`
    const link = `http:\\${host}\\account\\confirm?token=${token}&id=${id}`
    const TemplateDir = path.join(__dirname + "/templates/userVerification.ejs")
    const textDir = path.join(__dirname + "/templates/userVerification.txt")
    const template = await generateTemplate(TemplateDir, { link, company: EMAIL_COMPANY_NAME })
    const text = await generateTemplate(textDir, { company: EMAIL_COMPANY_NAME, link })
    transporter.sendMail({
      to: email,
      subject: 'Welcome to Endexel',
      html: template,
      text: text
    }, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },
  resetPassword: async (host,id,email, token) => {
    // const link = `http:\\${SERVER.host}:${SERVER.port}\\user\\reset?token=${token}&id=${id}`
    const link = `http:\\${host}\\resetPassword?token=${token}&id=${id}`
    const TemplateDir = path.join(__dirname + "/templates/resetPassword.ejs")
    const textDir = path.join(__dirname + "/templates/resetPassword.txt")
    const template = await generateTemplate(TemplateDir, { link, company: EMAIL_COMPANY_NAME, validTime: '30 minutes' })
    const text = await generateTemplate(textDir, { company: EMAIL_COMPANY_NAME, link, validTime: '30 minutes' })
    transporter.sendMail({
      to: email,
      subject: 'Reset your password',
      html: template,
      text: text
    }, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
