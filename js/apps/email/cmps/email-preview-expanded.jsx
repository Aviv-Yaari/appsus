import { utilService } from '../../../services/util.service.js';

export const EmailPreviewExpanded = (props) => {
  const { sentAt, body, from, to, status } = props.email;
  return (
    <section className="email-preview-expanded flex column">
      <div className="email-header">
        {status === 'inbox' && <div>From: {from}</div>}
        {(status === 'sent' || status === 'draft') && <div>To: {to}</div>}
        <div>Sent at: {utilService.formatDate(sentAt)}</div>
      </div>
      <div>{body}</div>
    </section>
  );
};
