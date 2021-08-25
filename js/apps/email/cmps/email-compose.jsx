// import ff from ''
export class EmailCompose extends React.Component {
  state = {
    title: '',
  };
  render() {
    const { onClose } = this.props;
    const { title } = this.state;
    return (
      <section className="email-compose">
        <div className="compose-title flex align-center">
          {title || 'New Message'}
          <button className="compose-btn-close" onClick={onClose}>
            <img src="../../../../assets/svg/close.svg" />
          </button>
        </div>
        <div className="compose-to flex align-center">
          <span>To</span>
          <input type="text" name="to" />
        </div>
        <div className="compose-subject flex align-center">
          <span>Subject</span>
          <input type="text" name="subject" />
        </div>
        <textarea name="body" rows="20" />
        <div className="compose-actions flex">
          <button className="compose-btn-send">Send</button>
          <button className="compose-btn-delete">
            <img src="../../../../assets/img/trash.png" />
          </button>
        </div>
      </section>
    );
  }
}
