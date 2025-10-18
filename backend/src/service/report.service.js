import nodemailer from 'nodemailer';

export const sendReportEmail = async (test) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NOTIFICATION_EMAIL,
        pass: process.env.NOTIFICATION_EMAIL_PASSWORD
      }
    });

    const htmlContent = generateReportHTML(test);

    await transporter.sendMail({
      from: `"Email Spam Report Tool" <${process.env.NOTIFICATION_EMAIL}>`,
      to: test.userEmail,
      subject: `Your Email Deliverability Report - ${test.testCode}`,
      html: htmlContent
    });

    console.log(`Report email sent to ${test.userEmail}`);
  } catch (error) {
    console.error('Error sending report email:', error);
  }
};

const generateReportHTML = (test) => {
  const resultsHTML = test.results.map(result => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">${result.email}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">${result.received ? '✅' : '❌'}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">${result.folder}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
        .score { font-size: 48px; font-weight: bold; color: #4F46E5; text-align: center; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #f9fafb; padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; }
        .btn { display: inline-block; padding: 12px 24px; background: #4F46E5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Email Deliverability Report</h1>
          <p>Test Code: ${test.testCode}</p>
        </div>
        <div class="content">
          <h2>Overall Score</h2>
          <div class="score">${test.deliverabilityScore}%</div>
          <p style="text-align: center; color: #6b7280;">
            ${test.results.filter(r => r.received).length} out of ${test.results.length} inboxes received your email
          </p>
          
          <h2 style="margin-top: 30px;">Detailed Results</h2>
          <table>
            <thead>
              <tr>
                <th>Email Address</th>
                <th>Received</th>
                <th>Folder</th>
              </tr>
            </thead>
            <tbody>
              ${resultsHTML}
            </tbody>
          </table>
          
          <div style="text-align: center;">
            <a href="${test.reportUrl}" class="btn">View Full Report</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};
