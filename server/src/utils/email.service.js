import config from "../config/env.js";
import transporter from "./mailer.js";

export async function sendInviteEmail(email, code, projectId) {
  if (!email) throw new Error("email is required");
  if (!code) throw new Error("code is required");
  if (!projectId) throw new Error("projectId is required");

  const inviteLink = `${config.CLIENT_ORIGIN}/invites?code=${code}`;

  const mailOptions = {
    from: `"CollabHub" <${config.EMAIL_USER}>`,
    to: email,
    subject: "Project Invitation",
    html: `
      <h2>You are invited to join a project</h2>
      <p>Click the link below to accept the invitation</p>
      <a href="${inviteLink}">Accept Invitation</a>
      <p>This link expires in 7 days.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
