

export const generateActivationTemplate =  (
  Code: string,
  name: string,
  activationLink: string
): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Activate Your Account</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px 0;
    }
    .header img {
      max-width: 150px;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content h1 {
      font-size: 24px;
      color: #333333;
      margin-bottom: 20px;
    }
    .content p {
      font-size: 16px;
      color: #555555;
      line-height: 1.6;
    }
    .activation-code {
      display: inline-block;
      margin: 20px 0;
      padding: 12px 24px;
      background-color: #f0f0f0;
      border: 1px solid #cccccc;
      border-radius: 5px;
      font-size: 18px;
      font-family: monospace;
      color: #333333;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #777777;
    }
    .footer a {
      color: #007BFF;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header Section -->

    <!-- Content Section -->
    <div class="content">
      <h1>Activate Your Account</h1>
      <p>Hi ${name},</p>
      <p>Thank you for signing up with Learner! To complete your registration, please use the activation code below:</p>
      <div class="activation-code">${Code}</div>
      <p>Here’s how to use it:</p>
      <ol style="text-align: left; max-width: 400px; margin: 0 auto;">
        <li>Go to the activation page: <a href=${activationLink}>Here</a></li>
        <li>Enter the code above into the activation form.</li>
        <li>Click "Activate Account" to complete the process.</li>
      </ol>
      <p>This code will expire in 10 min. If you didn’t create an account with us, please ignore this email or contact our support team.</p>
    </div>

    <!-- Footer Section -->
    <div class="footer">
      <p>If you have any questions, feel free to <a href="mailto:ebrahim@gmail.com">contact us</a>.</p>
      <p>Best regards,<br>learner</p>
      <p><a href="[Company Website]">Visit our website</a></p>
    </div>
  </div>
</body>
</html>`;
};
