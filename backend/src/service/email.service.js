import { getGmailClient } from '../config/email.config.js';

export const checkInbox = async (inboxConfig, testCode) => {
  try {
    if (inboxConfig.provider.startsWith('gmail')) {
      return await checkGmailInbox(inboxConfig, testCode);
    } else if (inboxConfig.provider.startsWith('outlook')) {
      return await checkOutlookInbox(inboxConfig, testCode);
    } else if (inboxConfig.provider === 'yahoo') {
      return await checkYahooInbox(inboxConfig, testCode);
    }
  } catch (error) {
    console.error(`Error checking ${inboxConfig.provider}:`, error);
    return {
      received: false,
      folder: 'NOT_RECEIVED'
    };
  }
};

const checkGmailInbox = async (inboxConfig, testCode) => {
  const gmail = await getGmailClient();
  
  // Search for email with test code
  const query = `subject:${testCode} OR body:${testCode}`;
  
  const response = await gmail.users.messages.list({
    userId: 'me',
    q: query,
    maxResults: 1
  });

  if (!response.data.messages || response.data.messages.length === 0) {
    return {
      received: false,
      folder: 'NOT_RECEIVED'
    };
  }

  const messageId = response.data.messages[0].id;
  const message = await gmail.users.messages.get({
    userId: 'me',
    id: messageId
  });

  // Determine folder based on labels
  const labels = message.data.labelIds || [];
  let folder = 'INBOX';

  if (labels.includes('SPAM')) {
    folder = 'SPAM';
  } else if (labels.includes('CATEGORY_PROMOTIONS')) {
    folder = 'PROMOTIONS';
  }

  return {
    received: true,
    folder,
    messageId,
    receivedAt: new Date(parseInt(message.data.internalDate))
  };
};

const checkOutlookInbox = async (inboxConfig, testCode) => {
  // Implement Microsoft Graph API integration
  // Similar to Gmail implementation using @microsoft/microsoft-graph-client
  return {
    received: false,
    folder: 'NOT_RECEIVED'
  };
};

const checkYahooInbox = async (inboxConfig, testCode) => {
  // Implement Yahoo Mail API integration using IMAP
  // Similar to Gmail implementation
  return {
    received: false,
    folder: 'NOT_RECEIVED'
  };
};
