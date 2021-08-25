export const EmailFolderList = ({ criteria, onSetCriteria }) => {
  const checkIsCriteria = (folderName) => {
    if (folderName === 'starred') return criteria.isStarred ? 'marked' : '';
    return folderName === criteria.status && !criteria.isStarred ? 'marked' : '';
  };

  return (
    <section className="email-folder-list flex column">
      <div className={checkIsCriteria('inbox')} onClick={() => onSetCriteria({ status: 'inbox' })}>
        Inbox
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
      <div
        className={checkIsCriteria('drafts')}
        onClick={() => onSetCriteria({ status: 'drafts' })}>
        Drafts
      </div>
    </section>
  );
};
