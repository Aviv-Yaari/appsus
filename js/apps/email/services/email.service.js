import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';
export const emailService = {
  query,
  addEmail,
  updateEmail,
  removeEmail,
  trashEmail,
};

let gEmails = initEmails();

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
};

function initEmails() {
  return (
    storageService.loadFromStorage('emails-db') || [
      {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Miss you (inbox)!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
      },
      {
        id: utilService.makeId(),
        status: 'sent',
        subject: 'Miss you! (sent)',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
      },
      {
        id: utilService.makeId(),
        status: 'draft',
        subject: 'Miss you! (draft)',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
      },
      {
        id: utilService.makeId(),
        status: 'trash',
        subject: 'Miss you! (trash)',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
      },
    ]
  );
}

function query(criteria) {
  return new Promise((resolve) => setTimeout(resolve, 1000, gEmails));
}

function _createEmail(userEmail) {
  const { status, subject, body, to } = userEmail;
  return {
    id: utilService.makeId(),
    status,
    subject,
    body,
    isRead: false,
    sentAt: Date.now(),
    to,
  };
}

function addEmail(userEmail) {
  gEmails.unshift(_createEmail(userEmail));
  return Promise.resolve(gEmails);
}

function updateEmail(userEmail) {
  const { id, status, subject, body, to } = userEmail;
  const currEmail = gEmails.find((email) => email.id === id);
  currEmail.status = status;
  currEmail.subject = subject;
  currEmail.body = body;
  currEmail.to = to;
  return Promise.resolve(currEmail);
}

function removeEmail(emailId) {
  const idx = gEmails.findIndex((email) => email.id === emailId);
  gEmails.splice(idx, 1);
  return Promise.resolve(gEmails);
}

function trashEmail(emailId) {
  const currEmail = gEmails.find((email) => email.id === emailId);
  currEmail.status = 'trash';
  return Promise.resolve(gEmails);
}
