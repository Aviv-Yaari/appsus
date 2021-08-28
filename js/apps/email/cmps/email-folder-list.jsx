import { emailService } from '../services/email.service.js';

const { NavLink } = ReactRouterDOM;

export const EmailFolderList = () => {
  return (
    <section className="email-folder-list flex">
      <NavLink to={'/emails/all'}>All</NavLink>
      <NavLink to={'/emails/inbox'}>
        Inbox <span>{emailService.getNumUnread('inbox') || ''}</span>
      </NavLink>
      <NavLink to={'/emails/sent'}>Sent</NavLink>
      <NavLink to={'/emails/draft'}>
        Drafts <span>{emailService.getEmailsByStatus('draft').length || ''}</span>
      </NavLink>
      <NavLink to={'/emails/trash'}>Trash</NavLink>
    </section>
  );
};
