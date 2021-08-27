// TODO ADD REPLY BTN
// TODO BONUS -- AFTER UPDATES - INSTEAD OF CALLING THIS.LOADEMAILS EVERY TIME, CALL FINDINSTATEANDUPDATE (TO MINIMIZE SERVER CALLS)

import { LoadingSpinner } from '../../../cmps/loading-spinner.jsx';
import { EmailCompose } from '../cmps/email-compose.jsx';
import { EmailFolderList } from '../cmps/email-folder-list.jsx';
import { EmailList } from '../cmps/email-list/email-list.jsx';
import { emailService } from '../services/email.service.js';
import { eventBusService } from '../../../services/event-bus.service.js';
import { EmailFilter } from '../cmps/email-filter.jsx';
import { EmailDetails } from './email-details.jsx';
import { BtnCompose } from '../cmps/btns/btn-compose.jsx';
const { Route } = ReactRouterDOM;

export class EmailIndex extends React.Component {
  state = {
    emails: null,
    criteria: { txt: '', status: this.props.match.params.status, page: 0 },
    sortType: { field: 'sentAt', type: 1 }, // type = 1: descending , type = -1: ascending
    isComposing: false,
  };

  // Lifecycle and general:

  componentDidMount() {
    this.loadEmails();
    this.removeEventBus = eventBusService.on('search', (data) => this.onSetCriteria({ txt: data }));
    this.loadSearchParams();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.onSetCriteria({ status: this.props.match.params.status });
    }
    if (prevProps.location.search !== this.props.location.search) {
      this.loadSearchParams();
    }
  }

  componentWillUnmount() {
    this.removeEventBus();
  }

  loadSearchParams = () => {
    const query = new URLSearchParams(this.props.location.search);
    this.subject = query.get('subject');
    this.body = query.get('body');
    this.to = query.get('to');
    let page = +query.get('page') || 0;
    if (page < 0) page = 0;
    if (this.subject && this.body && this.to) this.setState({ isComposing: true });
    this.setState((prevState) => ({ criteria: { ...prevState.criteria, page } }));
  };

  loadEmails = () => {
    const { criteria, sortType } = this.state;
    emailService.query(criteria, sortType).then((emails) => this.setState({ emails }));
  };

  // Criteria and sort:

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

  onChangePage = (page) => {
    this.props.history.push(this.props.match.url + '?page=' + page);
  };

  // Compose Actions:

  onComposeToggle = (isComposing) => {
    if (!isComposing) {
      this.props.history.push(this.props.match.url + '?');
      this.loadEmails();
    }
    this.setState({ isComposing });
  };

  onSendEmail = (email, ev) => {
    ev.preventDefault();
    if (email.id) {
      emailService.findByIdAndUpdate(email.id, { ...email, status: 'sent' });
    } else {
      emailService.addEmail({ ...email, status: 'sent' });
    }
    eventBusService.emit('user-msg', 'Email sent');
    this.setState({ isComposing: false });
    this.loadEmails();
  };

  // Email Actions:

  onPreviewClick = (email) => {
    if (!email.isRead) {
      emailService.findByIdAndUpdate(email.id, { isRead: true }).then(this.loadEmails);
    }
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

  onExportNote = (email, ev) => {
    ev.stopPropagation();
    this.props.history.push(`/keep?title=${email.subject}&txt=${email.body}`);
  };

  onReply = (email, ev) => {
    ev.stopPropagation();
    this.props.history.push(
      `?subject=RE: ${email.subject}&to=${email.from}&body=In reply to your message:\n"${email.body}"\n\n`
    );
  };

  // Render:

  render() {
    const { emails, criteria, isComposing, sortType, currPage } = this.state;
    const { params } = this.props.match;
    if (!emails) return <LoadingSpinner />;
    return (
      <section className="email-app flex">
        <aside className="left-panel">
          <BtnCompose onToggle={this.onComposeToggle} />
          <EmailFolderList />
        </aside>
        {params.emailId && (
          <EmailDetails
            id={params.emailId}
            onTrash={this.onTrashEmail}
            loadEmails={this.loadEmails}
            onExportNote={this.onExportNote}
            onReply={this.onReply}
          />
        )}
        {!params.emailId && (
          <section className="email-container flex column">
            <EmailFilter
              onFilter={this.onSetCriteria}
              onSort={this.onSetSort}
              onChangePage={this.onChangePage}
              sortType={sortType}
              criteria={criteria}
              emailsCount={emails.length}
            />
            <EmailList
              emails={emails}
              onPreviewClick={this.onPreviewClick}
              onValueToggle={this.onValueToggle}
              onTrash={this.onTrashEmail}
              onFullScreen={this.onFullScreen}
              onExportNote={this.onExportNote}
              onReply={this.onReply}
            />
          </section>
        )}
        {isComposing && (
          <EmailCompose
            onSend={this.onSendEmail}
            onClose={() => this.onComposeToggle(false)}
            subject={this.subject}
            to={this.to}
            body={this.body}
          />
        )}
      </section>
    );
  }
}
