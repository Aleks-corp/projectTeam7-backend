import sgMail from "@sendgrid/mail";

const sendMail = async data => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  return await sgMail.send(data);
};

export default sendMail;
