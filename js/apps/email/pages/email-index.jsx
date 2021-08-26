// TODO -- ADD FILTER COMPONENT ON TOP OF EMAILS LIST AND PUT THE STARRED, READ, UNREAD FILTERS THERE. WILL SOLVE ISSUES
// TODO BONUS -- AFTER UPDATES - INSTEAD OF CALLING THIS.LOADEMAILS EVERY TIME, CALL FINDINSTATEANDUPDATE (TO MINIMIZE SERVER CALLS)

import { LoadingSpinner } from '../../../cmps/loading-spinner.jsx';
import { EmailCompose } from '../cmps/email-compose.jsx';
import { EmailFolderList } from '../cmps/email-folder-list.jsx';
import { EmailList } from '../cmps/email-list.jsx';
import { emailService } from '../services/email.service.js';
import { eventBusService } from '../../../services/event-bus.service.js';
import { EmailFilter } from '../cmps/email-filter.jsx';

export class EmailIndex extends React.Component {
  state = {
    emails: null,
    criteria: { txt: '', status: 'inbox' },
    isComposing: false,
  };
  componentDidMount() {
    this.loadEmails(this.state.criteria);
    this.removeEventBus = eventBusService.on('search', (data) => this.onSetCriteria({ txt: data }));
  }

  componentWillUnmount() {
    this.removeEventBus();
  }

  loadEmails = (criteria) => {
    emailService.query(criteria).then((emails) => this.setState({ emails }));
  };

  onPreviewClick = (email) => {
    if (!email.isRead) {
      emailService
        .findByIdAndUpdate(email.id, { isRead: true })
        .then(() => this.loadEmails(this.state.criteria));
    }
  };

  onSetCriteria = (newCriteria) => {
    this.setState((prevState) => {
      const criteria = { ...prevState.criteria, ...newCriteria };
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

  onValueToggle = (ev, email, value) => {
    ev.stopPropagation();
    emailService
      .findByIdAndUpdate(email.id, { [value]: !email[value] })
      .then(() => this.loadEmails(this.state.criteria));
  };

  onTrashEmail = (ev, email) => {
    ev.stopPropagation();
    emailService.trashEmail(email.id).then(() => this.loadEmails(this.state.criteria));
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
          <EmailFilter onSetCriteria={this.onSetCriteria} />
          <EmailList
            emails={emails}
            onPreviewClick={this.onPreviewClick}
            onValueToggle={this.onValueToggle}
            onTrash={this.onTrashEmail}
          />
        </section>
        {isComposing && (
          <EmailCompose onSend={this.onSendEmail} onClose={() => this.onComposeToggle(false)} />
        )}
      </section>
    );
  }
}
