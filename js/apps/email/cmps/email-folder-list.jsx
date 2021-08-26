import { emailService } from '../services/email.service.js';

export const EmailFolderList = ({ criteria, onSetCriteria }) => {
  const checkIsCriteria = (folderName) => {
    return folderName === criteria.status ? 'marked' : '';
  };
  // Todo - move the getNumUnread and get num of drafts to the email-index state. to minimize calls to the server
  return (
    <section className="email-folder-list flex column">
      <div
        className={checkIsCriteria(undefined)}
        onClick={() => onSetCriteria({ status: undefined })}>
        All
      </div>
      <div className={checkIsCriteria('inbox')} onClick={() => onSetCriteria({ status: 'inbox' })}>
        Inbox <span>{emailService.getNumUnread('inbox') || ''}</span>
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
