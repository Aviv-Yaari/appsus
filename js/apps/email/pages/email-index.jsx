import { LoadingSpinner } from '../../../cmps/loading-spinner.jsx';
import { EmailFolderList } from '../cmps/email-folder-list.jsx';
import { EmailList } from '../cmps/email-list.jsx';
import { emailService } from '../services/email.service.js';

export class EmailIndex extends React.Component {
  state = { emails: null };

  componentDidMount() {
    this.loadEmails();
  }

  loadEmails = () => {
    emailService.query().then((emails) => this.setState({ emails }));
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

  render() {
    const { emails } = this.state;
    if (!emails) return <LoadingSpinner />;
    if (!emails.length) return <div>No emails</div>;
    return (
      <section className="email-app flex">
        <aside className="left-panel">
          <EmailFolderList />
        </aside>
        <main className="email-container flex column">
          <EmailList emails={emails} onPreviewClick={this.onPreviewClick} />
        </main>
      </section>
    );
  }
}
