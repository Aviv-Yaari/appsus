import { utilService } from '../../../services/util.service.js';

export const EmailPreviewExpanded = (props) => {
  const { sentAt, body, from } = props.email;
  return (
    <section className="email-preview-expanded flex column">
      <div className="email-header">
        <div>From: {from}</div>
        <div>Sent at: {utilService.formatDate(sentAt)}</div>
      </div>
      <div>{body}</div>
    </section>
  );
};
