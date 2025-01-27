export const generateForgotPasswordTemplate = (name:string, link: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f5f5f5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #2c3e50;">
                <h1 style="color: #ffffff; margin: 0;">Learner</h1>
            </td>
        </tr>
        
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px;">
                    <tr>
                        <td>
                            <h2 style="color: #2c3e50; margin-top: 0;">Password Reset Request</h2>
                            <p style="color: #333333;">Hello ${name},</p>
                            <p style="color: #333333;">We received a request to reset your password. Click the button below to reset it:</p>
                            
                            <p style="text-align: center; margin: 30px 0;">
                                <a href=${link}" 
                                   style="background-color: #3498db; color: #ffffff; padding: 12px 25px; 
                                          text-decoration: none; border-radius: 5px; font-weight: bold;
                                          display: inline-block;">
                                    Reset Password
                                </a>
                            </p>

                            <p style="color: #333333; font-size: 14px;">
                                This link will expire in 10 minutes. If you didn't request this password reset, 
                                please ignore this email or contact support immediately.
                            </p>

                            <div style="border-top: 1px solid #eeeeee; margin: 25px 0; padding-top: 15px;">
                                <p style="color: #666666; font-size: 12px;">
                                    <strong>Security Tip:</strong> Never share this link with anyone. Our support team will 
                                    never ask for your password or this reset link.
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <tr>
            <td style="padding: 20px 10px; text-align: center; background-color: #2c3e50;">
                <p style="color: #ffffff; margin: 0; font-size: 12px;">
                    © 2023 Learner. All rights reserved.<br>
                    <br>
                    Need help? <a href="mailto:[Support Email]" style="color: #ffffff; text-decoration: underline;">Contact Support</a>
                </p>
                <p style="color: #ffffff; font-size: 12px; margin: 10px 0 0 0;">
                    This is an automated message - please do not reply directly to this email.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`
}