// TODO -- ADD FILTER COMPONENT ON TOP OF EMAILS LIST AND PUT THE STARRED, READ, UNREAD FILTERS THERE. WILL SOLVE ISSUES
// TODO BONUS -- AFTER UPDATES - INSTEAD OF CALLING THIS.LOADEMAILS EVERY TIME, CALL FINDINSTATEANDUPDATE (TO MINIMIZE SERVER CALLS)

import { LoadingSpinner } from '../../../cmps/loading-spinner.jsx';
import { EmailCompose } from '../cmps/email-compose.jsx';
import { EmailFolderList } from '../cmps/email-folder-list.jsx';
import { EmailList } from '../cmps/email-list.jsx';
import { emailService } from '../services/email.service.js';
import { eventBusService } from '../../../services/event-bus.service.js';
import { EmailFilter } from '../cmps/email-filter.jsx';
import { EmailDetails } from './email-details.jsx';
const { Route } = ReactRouterDOM;

export class EmailIndex extends React.Component {
  state = {
    emails: null,
    criteria: { txt: '', status: this.props.match.params.status },
    sortType: { field: 'sentAt', type: 1 }, // type 1 - descending , type -1 - ascending
    isComposing: false,
  };

  componentDidMount() {
    this.loadEmails();
    this.removeEventBus = eventBusService.on('search', (data) => this.onSetCriteria({ txt: data }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.onSetCriteria({ status: this.props.match.params.status });
    }
  }

  componentWillUnmount() {
    this.removeEventBus();
  }

  loadEmails = () => {
    const { criteria, sortType } = this.state;
    emailService.query(criteria, sortType).then((emails) => this.setState({ emails }));
  };

  onPreviewClick = (email) => {
    if (!email.isRead) {
      emailService.findByIdAndUpdate(email.id, { isRead: true }).then(this.loadEmails);
    }
  };

  onSetCriteria = (newCriteria) => {
    this.setState(
      (prevState) => ({ criteria: { ...prevState.criteria, ...newCriteria } }),
      this.loadEmails
    );
  };

  onSetSort = (ev) => {
    const { name: field } = ev.target;
    const newSort = { field, type: 1 };

    this.setState((prevState) => {
      const { sortType } = prevState;
      if (sortType.field === field) newSort.type = sortType.type * -1;
      return { sortType: newSort };
    }, this.loadEmails);
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
    emailService.findByIdAndUpdate(email.id, { [value]: !email[value] }).then(this.loadEmails);
  };

  onTrashEmail = (ev, email) => {
    ev.stopPropagation();
    emailService.trashEmail(email.id).then(this.loadEmails);
  };

  onFullScreen = (id) => {
    this.props.history.push(this.props.location.pathname + '/' + id);
  };

  render() {
    const { emails, criteria, isComposing, sortType } = this.state;
    const { params } = this.props.match;
    if (!emails) return <LoadingSpinner />;
    // if (!emails.length) return <div>No emails</div>;
    return (
      <section className="email-app flex">
        <aside className="left-panel">
          <button
            className="btn-compose flex justify-center align-center"
            onClick={() => this.onComposeToggle(true)}>
            <img src="assets/img/plus.png" />
            Compose
          </button>
          <EmailFolderList />
        </aside>
        {params.emailId && (
          <EmailDetails
            id={params.emailId}
            onTrash={this.onTrashEmail}
            loadEmails={this.loadEmails}
          />
        )}

        {!params.emailId && (
          <section className="email-container flex column">
            <EmailFilter
              onFilter={this.onSetCriteria}
              onSort={this.onSetSort}
              sortType={sortType}
              criteria={criteria}
            />
            <EmailList
              emails={emails}
              onPreviewClick={this.onPreviewClick}
              onValueToggle={this.onValueToggle}
              onTrash={this.onTrashEmail}
              onFullScreen={this.onFullScreen}
            />
          </section>
        )}
        {isComposing && (
          <EmailCompose onSend={this.onSendEmail} onClose={() => this.onComposeToggle(false)} />
        )}
      </section>
    );
  }
}
