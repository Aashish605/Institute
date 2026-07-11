import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const siteName = process.env.SITE_NAME || 'Institute';
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';

/**
 * Send an email-verification link to the user.
 * @param {string} email - recipient address
 * @param {string} token - the raw verification token
 */
export const sendVerificationEmail = async (email, token) => {
    const link = `${backendUrl}/auth/verify-email?token=${token}`;

    await transporter.sendMail({
        from: `"${siteName}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Verify your ${siteName} account`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your email</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#004e8f 0%,#0070cc 100%);padding:36px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">${siteName}</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Email Verification</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 12px;color:#1a202c;font-size:20px;font-weight:600;">Verify your email address</h2>
              <p style="margin:0 0 24px;color:#4a5568;font-size:15px;line-height:1.6;">
                Thanks for signing up! Click the button below to verify your email address and activate your account.
                This link will expire in <strong>24 hours</strong>.
              </p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding:8px 0 32px;">
                    <a href="${link}"
                       style="display:inline-block;background:linear-gradient(135deg,#004e8f,#0070cc);color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 36px;border-radius:10px;letter-spacing:0.3px;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;color:#718096;font-size:13px;">Or copy and paste this link into your browser:</p>
              <p style="margin:0 0 24px;word-break:break-all;">
                <a href="${link}" style="color:#0070cc;font-size:13px;">${link}</a>
              </p>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 24px;" />
              <p style="margin:0;color:#a0aec0;font-size:12px;line-height:1.6;">
                If you didn't create an account with ${siteName}, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f7fafc;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#a0aec0;font-size:12px;">
                &copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
    });
};

export const sendResetPasswordEmail = async (email, token) => {
    const link = `${clientUrl}/reset-password?token=${token}`;

    await transporter.sendMail({
        from: `"${siteName}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Reset your ${siteName} password`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your password</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#004e8f 0%,#0070cc 100%);padding:36px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">${siteName}</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Password Reset</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 12px;color:#1a202c;font-size:20px;font-weight:600;">Reset your password</h2>
              <p style="margin:0 0 24px;color:#4a5568;font-size:15px;line-height:1.6;">
                We received a request to reset your password. Click the button below to set a new one.
                This link will expire in <strong>30 minutes</strong>.
              </p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding:8px 0 32px;">
                    <a href="${link}"
                       style="display:inline-block;background:linear-gradient(135deg,#004e8f,#0070cc);color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 36px;border-radius:10px;letter-spacing:0.3px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;color:#718096;font-size:13px;">Or copy and paste this link into your browser:</p>
              <p style="margin:0 0 24px;word-break:break-all;">
                <a href="${link}" style="color:#0070cc;font-size:13px;">${link}</a>
              </p>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 24px;" />
              <p style="margin:0;color:#a0aec0;font-size:12px;line-height:1.6;">
                If you didn't request a password reset, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f7fafc;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#a0aec0;font-size:12px;">
                &copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
    });
};
