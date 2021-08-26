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
    this.interval = setTimeout(this.saveDraft, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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
    if (!id) return;
    emailService.trashEmail(id);
    this.props.onClose();
  };

  render() {
    const { onClose, onSend } = this.props;
    const { subject } = this.state.email;
    return (
      <section className="email-compose">
        <div className="compose-title flex align-center">
          {subject || 'New Message'}
          <button className="compose-btn-close" onClick={onClose}>
            <img src="assets/svg/close.svg" />
          </button>
        </div>
        <div className="compose-to flex align-center">
          <span>To</span>
          <input type="text" name="to" onChange={this.handleChange} />
        </div>
        <div className="compose-subject flex align-center">
          <span>Subject</span>
          <input type="text" name="subject" onChange={this.handleChange} />
        </div>
        <textarea name="body" rows="20" onChange={this.handleChange} />
        <div className="compose-actions flex">
          <button className="compose-btn-send" onClick={() => onSend(this.state.email)}>
            Send
          </button>
          <button onClick={this.deleteDraft} className="compose-btn-delete">
            <img src="assets/img/trash.png" />
          </button>
        </div>
      </section>
    );
  }
}
