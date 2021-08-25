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
          <EmailList emails={emails} />
        </main>
      </section>
    );
  }
}
