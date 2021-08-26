import { EmailPreview } from './email-preview.jsx';

export const EmailList = ({ emails, onPreviewClick, onTrash, onValueToggle, onFullScreen }) => {
  return (
    <section className="email-list">
      {emails.map((email) => (
        <EmailPreview
          key={email.id}
          email={email}
          onPreviewClick={onPreviewClick}
          onValueToggle={onValueToggle}
          onTrash={onTrash}
          onFullScreen={onFullScreen}
        />
      ))}
    </section>
  );
};
