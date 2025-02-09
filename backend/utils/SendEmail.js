import nodeMailer from "nodemailer";
// import dns from "dns";
// import util from "util";

// Convert dns.resolveMx to a promise-based function
// const resolveMx = util.promisify(dns.resolveMx);

// export const checkEmailExists = async (email) => {
//   try {
//     // Extract domain from email (everything after @)
//     const domain = email.split("@")[1];

//     if (!domain) {
//       throw new Error("Invalid email format.");
//     }

//     // Check MX records of the domain
//     const mxRecords = await resolveMx(domain);

//     // If MX records exist, it means the email domain can receive emails
//     return mxRecords && mxRecords.length > 0;
//   } catch (error) {
//     return false; // If any error occurs, consider the email invalid
//   }
// };

//method to send email
export const sendEmail = async ({ email, subject, message }) => {
  //this code is used to send email to the user using nodemailer
  const transporter = nodeMailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
    },
  });

  // const isEmailVerified = await checkEmailExists(email);
  // console.log(isEmailVerified);

  //options for sending email to the user
  const options = {
    from: process.env.MAIL,
    to: email,
    subject,
    html: message,
  };
  await transporter.sendMail(options);
};
