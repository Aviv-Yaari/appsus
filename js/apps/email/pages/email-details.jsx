import { LoadingSpinner } from '../../../cmps/loading-spinner.jsx';
import { LongTxt } from '../../../cmps/long-txt.jsx';
import { utilService } from '../../../services/util.service.js';
import { BtnExportNote } from '../cmps/btns/btn-export-note.jsx';
import { BtnRead } from '../cmps/btns/btn-read.jsx';
import { BtnReply } from '../cmps/btns/btn-reply.jsx';
import { BtnStar } from '../cmps/btns/btn-star.jsx';
import { BtnTrash } from '../cmps/btns/btn-trash.jsx';
import { emailService } from '../services/email.service.js';
const { withRouter } = ReactRouterDOM;

class _EmailDetails extends React.Component {
  state = { email: null };

  componentDidMount() {
    this.loadEmail();
  }

  loadEmail = () => {
    const { id } = this.props;
    emailService.getEmailById(id).then((email) => this.setState({ email }));
  };

  onBack = () => {
    this.props.history.push('/emails/' + this.props.match.params.status);
  };

  onTrash = (ev, email) => {
    this.onBack();
    this.props.onTrash(ev, email);
  };

  onValueToggle = (value) => {
    const { email } = this.state;
    this.props.onValueToggle(null, email, value).then(this.loadEmail);
  };

  render() {
    const { email } = this.state;
    if (email === undefined) return <div>Email not found.</div>;
    if (!email) return <LoadingSpinner />;
    const { onExportNote, onReply } = this.props;
    const { status, from, to, sentAt, subject, body } = email;
    return (
      <section className="email-details flex column">
        <section className="email-details-toolbar flex">
          <div>
            <img onClick={this.onBack} src="assets/img/back.png" />
          </div>
          <div>
            <BtnReply onClick={(ev) => onReply(email, ev)} />
            <BtnTrash onTrash={(ev) => this.onTrash(ev, email)} />
            <BtnRead email={email} onToggle={() => this.onValueToggle('isRead')} />
            <BtnExportNote onExport={(ev) => onExportNote(email, ev)} />
            <BtnStar email={email} onToggle={() => this.onValueToggle('isStarred')} />
          </div>
        </section>
        <h2 className="email-details-subject">
          <LongTxt text={subject || 'no subject'} length={100} />
        </h2>
        <section className="email-header">
          {(status === 'inbox' || status === 'trash') && <div>From: {from}</div>}
          {(status === 'sent' || status === 'draft') && <div>To: {to}</div>}
          <div>Sent at: {utilService.formatDate(sentAt)}</div>
        </section>
        <p style={{ whiteSpace: 'pre-line', maxWidth: '900px' }}>
          <LongTxt text={body} length={300} />
        </p>
      </section>
    );
  }
}

export const EmailDetails = withRouter(_EmailDetails);
