import { emailService } from '../services/email.service.js';

export const EmailFolderList = ({ criteria, onSetCriteria }) => {
  const checkIsCriteria = (folderName) => {
    if (folderName === 'starred') return criteria.isStarred ? 'marked' : '';
    return folderName === criteria.status && !criteria.isStarred ? 'marked' : '';
  };
  // Todo - move the getNumUnread and get num of drafts to the email-index state. to minimize calls to the server
  return (
    <section className="email-folder-list flex column">
      <div className={checkIsCriteria('inbox')} onClick={() => onSetCriteria({ status: 'inbox' })}>
        Inbox <span>{emailService.getNumUnread('inbox') || ''}</span>
      </div>
      <div
        className={checkIsCriteria('starred')}
        onClick={() => onSetCriteria({ isStarred: true })}>
        Starred
      </div>
      <div className={checkIsCriteria('sent')} onClick={() => onSetCriteria({ status: 'sent' })}>
        Sent
      </div>
      <div className={checkIsCriteria('trash')} onClick={() => onSetCriteria({ status: 'trash' })}>
        Trash
      </div>
      <div className={checkIsCriteria('draft')} onClick={() => onSetCriteria({ status: 'draft' })}>
        Drafts <span>{emailService.getEmailsByStatus('draft').length || ''}</span>
      </div>
    </section>
  );
};
