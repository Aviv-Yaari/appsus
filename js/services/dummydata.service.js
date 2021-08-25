import { utilService } from './util.service.js';

export const dummyDataService = {
  getDummyEmails,
};

const DUMMY_EMAILS = [
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'Hello My Friend',
    body: 'Would love to catch up sometimes',
    isRead: false,
    isStarred: false,
    sentAt: 1551133930594,
    to: 'momo@momo.com',
    from: 'user@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'This is Muki',
    body: 'Would love to catch up sometimes',
    isRead: false,
    isStarred: true,
    sentAt: 1551133930594,
    to: 'momo@momo.com',
    from: 'user@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'I love you !!!',
    body: 'Would love to catch up sometimes',
    isRead: true,
    isStarred: true,
    sentAt: 1571133930594,
    to: 'momo@momo.com',
    from: 'user@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'inbox',
    subject: 'Miss you (inbox)!',
    body: 'Would love to catch up sometimes',
    isRead: true,
    isStarred: false,
    sentAt: 1551133930594,
    to: 'momo@momo.com',
    from: 'user@appsus.com',
  },
  {
    id: utilService.makeId(),
    status: 'sent',
    subject: 'Miss you! (sent)',
    body: 'Would love to catch up sometimes',
    isRead: true,
    isStarred: false,
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
    isStarred: false,
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
    isStarred: false,
    sentAt: 1551133930594,
    to: 'momo@momo.com',
    from: 'user@appsus.com',
  },
];

function getDummyEmails() {
  return [...DUMMY_EMAILS];
}
