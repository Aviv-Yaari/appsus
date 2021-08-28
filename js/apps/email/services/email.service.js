import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';
import { dummyDataService } from '../../../services/dummydata.service.js';
import { constsService } from '../../../services/consts.service.js';
export const emailService = {
  query,
  addEmail,
  updateEmail,
  trashEmail,
  getEmailById,
  getNumUnread,
  getEmailsByStatus,
  findByIdAndUpdate,
};

let gEmails = _initEmails();

const loggedinUser = {
  email: 'muki@appsus.com',
  fullname: 'Mahatma Appsus',
};

function _initEmails() {
  let emails = storageService.loadFromStorage('emails-db') || dummyDataService.getDummyEmails();
  _saveEmailsToStorage(emails);
  return emails;
}

function query(criteria, sort) {
  const { EMAILS_PER_PAGE } = constsService;
  const { page = 0 } = criteria;
  const mails = gEmails.filter((mail) => {
    const statusCond = criteria.status === 'all' || mail.status === criteria.status;
    const starredCond = criteria.isStarred === undefined || mail.isStarred === criteria.isStarred;
    const txtCond =
      !criteria.txt || mail.subject.toLowerCase().includes(criteria.txt.toLowerCase());
    const readCond = criteria.isRead === undefined || mail.isRead === criteria.isRead;
    return statusCond && starredCond && txtCond && readCond;
  });
  if (sort) mails.sort((a, b) => (a[sort.field] < b[sort.field] ? sort.type : sort.type * -1));
  return new Promise((resolve) =>
    setTimeout(
      resolve,
      200,
      mails.slice(page * EMAILS_PER_PAGE, page * EMAILS_PER_PAGE + EMAILS_PER_PAGE)
    )
  );
}

function getNumUnread(status) {
  return gEmails.reduce(
    (count, email) => (!email.isRead && email.status === status ? count + 1 : count),
    0
  );
}

function getEmailsByStatus(status) {
  return gEmails.filter((email) => email.status === status);
}

function getEmailById(id) {
  return Promise.resolve(gEmails.find((email) => email.id === id));
}

function findByIdAndUpdate(id, change) {
  const idx = gEmails.findIndex((email) => email.id === id);
  gEmails[idx] = { ...gEmails[idx], ...change };
  _saveEmailsToStorage(gEmails);
  return Promise.resolve(gEmails[idx]);
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

function addEmail(userEmail) {
  const email = _createEmail(userEmail);
  gEmails.unshift(email);
  _saveEmailsToStorage(gEmails);
  return Promise.resolve(email);
}

function updateEmail(userEmail) {
  let idx = gEmails.findIndex((email) => email.id === userEmail.id);
  gEmails[idx] = userEmail;
  _saveEmailsToStorage(gEmails);
  return Promise.resolve(gEmails[idx]);
}

function trashEmail(emailId) {
  const idx = gEmails.findIndex((email) => email.id === emailId);
  if (idx === -1) return Promise.reject('Not found');
  if (gEmails[idx].status !== 'trash') gEmails[idx].status = 'trash';
  else gEmails.splice(idx, 1);
  _saveEmailsToStorage(gEmails);
  return Promise.resolve(gEmails);
}

function _saveEmailsToStorage(emails) {
  storageService.saveToStorage('emails-db', emails);
}
