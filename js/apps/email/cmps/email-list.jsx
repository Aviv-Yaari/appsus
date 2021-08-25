import { EmailPreview } from './email-preview.jsx';

export const EmailList = ({ emails, onPreviewClick, onStarToggle }) => {
  return (
    <section className="email-list">
      {emails.map((email) => (
        <EmailPreview
          key={email.id}
          email={email}
          onPreviewClick={onPreviewClick}
          onStarToggle={onStarToggle}
        />
      ))}
    </section>
  );
};
