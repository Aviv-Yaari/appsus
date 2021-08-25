import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';
export const emailService = {
  query,
  addEmail,
  updateEmail,
  removeEmail,
  trashEmail,
  getEmailById,
};

let gEmails = _initEmails();

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
};

function _initEmails() {
  let emails = storageService.loadFromStorage('emails-db');
  if (emails) return emails;
  else
    emails = [
      {
        id: utilService.makeId(),
        status: 'inbox',
        subject: 'Miss you (inbox)!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'user@appsus.com',
      },
      {
        id: utilService.makeId(),
        status: 'sent',
        subject: 'Miss you! (sent)',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'user@appsus.com',
      },
      {
        id: utilService.makeId(),
        status: 'draft',
        subject: 'Miss you! (draft)',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'user@appsus.com',
      },
      {
        id: utilService.makeId(),
        status: 'trash',
        subject: 'Miss you! (trash)',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'user@appsus.com',
      },
    ];
  _saveEmailsToStorage(emails);
  return emails;
}

function query(criteria) {
  return new Promise((resolve) => setTimeout(resolve, 200, gEmails));
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

function getEmailById(id) {
  return Promise.resolve(gEmails.find((email) => email.id === id));
}

function addEmail(userEmail) {
  gEmails.unshift(_createEmail(userEmail));
  _saveEmailsToStorage(gEmails);
  return Promise.resolve(gEmails);
}

function updateEmail(userEmail) {
  let idx = gEmails.findIndex((email) => email.id === userEmail.id);
  gEmails[idx] = userEmail;
  _saveEmailsToStorage(gEmails);
  return Promise.resolve(gEmails[idx]);
}

function removeEmail(emailId) {
  const idx = gEmails.findIndex((email) => email.id === emailId);
  gEmails.splice(idx, 1);
  _saveEmailsToStorage(gEmails);
  return Promise.resolve(gEmails);
}

function trashEmail(emailId) {
  const idx = gEmails.findIndex((email) => email.id === emailId);
  gEmails[idx].status = 'trash';
  _saveEmailsToStorage(gEmails);
  return Promise.resolve(gEmails);
}

function _saveEmailsToStorage(emails) {
  storageService.saveToStorage('emails-db', emails);
}
