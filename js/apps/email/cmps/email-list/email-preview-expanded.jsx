import { utilService } from '../../../../services/util.service.js';

export const EmailPreviewExpanded = (props) => {
  const { subject, sentAt, body, from, to, status } = props.email;
  return (
    <section className="email-preview-expanded flex column">
      <div className="email-header">
        {(status === 'inbox' || status === 'trash') && <div>From: {from}</div>}
        {(status === 'sent' || status === 'draft' || status === 'trash') && <div>To: {to}</div>}
        <div>Sent at: {utilService.formatDate(sentAt)}</div>
      </div>
      <article style={{ whiteSpace: 'pre-line' }}>{body}</article>
    </section>
  );
};
