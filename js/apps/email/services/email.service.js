import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';
import { dummyDataService } from '../../../services/dummydata.service.js';
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
  let emails = storageService.loadFromStorage('emails-db') || dummyDataService.getDummyEmails();
  _saveEmailsToStorage(emails);
  return emails;
}

function query(criteria) {
  const mails = gEmails.filter(
    (mail) => mail.status === criteria.status && mail.isStarred === criteria.isStarred
  );
  return new Promise((resolve) => setTimeout(resolve, 200, mails));
}

function _createEmail(userEmail) {
  const { status, subject, body, to } = userEmail;
  return {
    id: utilService.makeId(),
    status,
    subject,
    body,
    isStarred: false,
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
