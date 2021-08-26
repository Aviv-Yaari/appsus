export class EmailCompose extends React.Component {
  state = {
    email: {
      subject: '',
      to: '',
      body: '',
    },
  };

  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState((prevState) => ({ email: { ...prevState.email, [name]: value } }));
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
          <button className="compose-btn-delete">
            <img src="../../../../assets/img/trash.png" />
          </button>
        </div>
      </section>
    );
  }
}
