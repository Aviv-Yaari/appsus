import { emailService } from '../services/email.service.js';

export class EmailCompose extends React.Component {
  state = {
    email: {
      subject: '',
      to: '',
      body: '',
    },
  };

  componentDidMount() {
    this.interval = setInterval(this.saveDraft, 5000);
    let { subject, body } = this.props;
    if (body && subject) {
      this.setState({ email: { subject, body, to: '' } });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  parseBody = () => {};

  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState((prevState) => ({ email: { ...prevState.email, [name]: value } }));
  };

  saveDraft = () => {
    const { email } = this.state;
    const { id, subject, body, to } = email;
    if (!id && (subject || body || to)) {
      emailService
        .addEmail({ ...email, status: 'draft' })
        .then((email) =>
          this.setState((prevState) => ({ email: { ...prevState.email, id: email.id } }))
        );
    } else emailService.findByIdAndUpdate(id, { ...email });
  };

  deleteDraft = () => {
    const { email } = this.state;
    const { id } = email;
    if (id) emailService.trashEmail(id);
    this.props.onClose();
  };

  render() {
    const { onClose, onSend } = this.props;
    const { subject, to, body } = this.state.email;
    return (
      <form onSubmit={(ev) => onSend(this.state.email, ev)} className="email-compose">
        <div className="compose-title flex align-center">
          {subject || 'New Message'}
          <button type="button" className="compose-btn-close" onClick={onClose}>
            <img src="assets/svg/close.svg" />
          </button>
        </div>
        <div className="compose-to flex align-center">
          <span>To</span>
          <input type="email" name="to" onChange={this.handleChange} value={to} required />
        </div>
        <div className="compose-subject flex align-center">
          <span>Subject</span>
          <input type="text" name="subject" onChange={this.handleChange} value={subject} />
        </div>
        <textarea name="body" rows="20" onChange={this.handleChange} value={body} />
        <div className="compose-actions flex">
          <button className="compose-btn-send" type="submit">
            Send
          </button>
          <button type="button" onClick={this.deleteDraft} className="compose-btn-delete">
            <img src="assets/img/trash.png" />
          </button>
        </div>
      </form>
    );
  }
}
