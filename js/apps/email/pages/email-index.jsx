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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.status !== this.props.match.params.status) {
      // when switching folders (inbox, sent, draft...)
      this.onSetCriteria({
        status: this.props.match.params.status,
        isRead: undefined,
        isStarred: undefined,
      });
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
    if (this.subject && this.body && this.to) this.setState({ isComposing: true });
  };

  loadEmails = () => {
    const { criteria, sortType } = this.state;
    emailService.query(criteria, sortType).then((emails) => this.setState({ emails }));
  };

  // Criteria and sort:

  onSetCriteria = (newCriteria) => {
    let { page = 0 } = newCriteria; // if any criteria was set except for page - reset the page to 0
    this.setState(
      (prevState) => ({ criteria: { ...prevState.criteria, ...newCriteria, page } }),
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
    eventBusService.emit('user-msg', 'Sending...');
    if (email.id) emailService.findByIdAndUpdate(email.id, { ...email, status: 'sent' });
    else emailService.addEmail({ ...email, status: 'sent' });

    new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
      eventBusService.emit('user-msg', 'Message sent.')
    );

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
    if (ev) ev.stopPropagation();
    const valueMap = { isRead: 'read', isStarred: 'starred' };
    emailService.findByIdAndUpdate(email.id, { [value]: !email[value] }).then(this.loadEmails);
    eventBusService.emit(
      'user-msg',
      `Conversation marked as ${email[value] === false ? '' : 'un'}${valueMap[value]}.`
    );
    return Promise.resolve();
  };

  onTrashEmail = (ev, email) => {
    ev.stopPropagation();
    const message =
      email.status === 'trash' ? 'Conversation removed from bin.' : 'Conversation moved to bin.';
    emailService.trashEmail(email.id).then(this.loadEmails);
    eventBusService.emit('user-msg', message);
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
    this.setState({ isComposing: true });
    this.subject = email.subject;
    this.to = email.to;
    this.body = email.body;
  };

  // Render:

  render() {
    const { emails, criteria, isComposing, sortType } = this.state;
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
            onValueToggle={this.onValueToggle}
          />
        )}
        {!params.emailId && (
          <section className="email-container flex column">
            <EmailFilter
              onFilter={this.onSetCriteria}
              onSort={this.onSetSort}
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
