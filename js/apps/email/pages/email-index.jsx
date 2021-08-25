import { LoadingSpinner } from '../../../cmps/loading-spinner.jsx';
import { EmailCompose } from '../cmps/email-compose.jsx';
import { EmailFolderList } from '../cmps/email-folder-list.jsx';
import { EmailList } from '../cmps/email-list.jsx';
import { emailService } from '../services/email.service.js';

export class EmailIndex extends React.Component {
  state = {
    emails: null,
    criteria: { txt: '', status: 'inbox', isStarred: false },
    isComposing: false,
  };

  componentDidMount() {
    this.loadEmails(this.state.criteria);
  }

  loadEmails = (criteria) => {
    emailService.query(criteria).then((emails) => this.setState({ emails }));
  };

  onPreviewClick = (email) => {
    if (!email.isRead) {
      emailService.updateEmail({ ...email, isRead: true }).then(() => {
        this.setState((prevState) => {
          const idx = prevState.emails.findIndex((currEmail) => currEmail.id === email.id);
          prevState.emails[idx].isRead = true;
          return { emails: prevState.emails };
        });
      });
    }
  };

  onSetCriteria = (newCriteria) => {
    this.setState((prevState) => {
      const criteria = { txt: prevState.criteria.txt, isStarred: false, ...newCriteria };
      this.loadEmails(criteria);
      return { criteria };
    });
  };

  onComposeToggle = (isComposing) => {
    this.setState({ isComposing });
  };

  onSendEmail = (email) => {
    emailService.addEmail({ ...email, status: 'sent' });
    this.setState({ isComposing: false });
  };

  render() {
    const { emails, criteria, isComposing } = this.state;
    if (!emails) return <LoadingSpinner />;
    // if (!emails.length) return <div>No emails</div>;
    return (
      <section className="email-app flex">
        <aside className="left-panel">
          <button
            className="btn-compose flex justify-center align-center"
            onClick={() => this.onComposeToggle(true)}>
            <img src="../../../../assets/img/plus.png" />
            Compose
          </button>
          <EmailFolderList criteria={criteria} onSetCriteria={this.onSetCriteria} />
        </aside>
        <section className="email-container flex column">
          <EmailList emails={emails} onPreviewClick={this.onPreviewClick} />
        </section>
        {isComposing && (
          <EmailCompose onSend={this.onSendEmail} onClose={() => this.onComposeToggle(false)} />
        )}
      </section>
    );
  }
}
