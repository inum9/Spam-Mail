import { google } from 'googleapis';
import dotenv from "dotenv";
dotenv.config({
  path:"./.env"
});

export const getGmailClient = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
};

export const getOutlookConfig = () => ({
  clientId: process.env.OUTLOOK_CLIENT_ID,
  clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
  tenantId: process.env.OUTLOOK_TENANT_ID,
  redirectUri: process.env.OUTLOOK_REDIRECT_URI
});

export const testInboxes = [
  { provider: 'gmail', email: process.env.GMAIL_TEST_INBOX },
  
  { provider: 'gmail2', email: process.env.GMAIL_TEST_INBOX_2 },

];
