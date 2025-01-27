export const generateTwoStepTemplate = (
  OTP: string,
  name: string,
  activationLink: string
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2FA Activation OTP</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f5f5f5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #1a73e8;">
                <h1 style="color: #ffffff; margin: 0;">YourAppName</h1>
            </td>
        </tr>
        
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px;">
                    <tr>
                        <td>
                            <h2 style="color: #1a73e8; margin-top: 0;">Two-Factor Authentication Activation</h2>
                            <p style="color: #333333;">Hello ${name},</p>
                            <p style="color: #333333;">Your One-Time Password (OTP) to activate Two-Factor Authentication is:</p>
                            
                            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 30px 0; border-radius: 6px;">
                                <span style="font-size: 28px; font-weight: bold; color: #1a73e8; letter-spacing: 2px;">${OTP}</span>
                            </div>

                            <p style="text-align: center; margin: 30px 0;">
                                <a href=${activationLink} 
                                   style="background-color: #1a73e8; color: #ffffff; padding: 12px 25px; 
                                          text-decoration: none; border-radius: 5px; font-weight: bold;
                                          display: inline-block;">
                                    Activate 2FA Now
                                </a>
                            </p>
                            
                            <p style="color: #333333;">This OTP is valid for 10 minutes. Please do not share this code or link with anyone.</p>
                            
                            <div style="border-left: 4px solid #1a73e8; padding-left: 15px; margin: 20px 0;">
                                <p style="color: #666666; font-size: 14px;">
                                    <strong>Security Note:</strong> If you didn't initiate this request, 
                                    please ignore this email and contact our support team immediately.
                                </p>
                            </div>
                            
                            <div style="margin-top: 30px; color: #666666; font-size: 14px;">
                                <p>Best regards,<br>Learner Team</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <tr>
            <td style="padding: 20px 10px; text-align: center; background-color: #1a73e8;">
                <p style="color: #ffffff; margin: 0; font-size: 12px;">
                    © 2023 YourAppName. All rights reserved.<br>
                    Learner<br>
                    Need help? <a href="[Support URL]" style="color: #ffffff; text-decoration: underline;">Contact Support</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`;
};
