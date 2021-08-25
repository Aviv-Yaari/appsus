export class EmailPreview extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div className={'email-preview ' + (!email.isRead ? 'unread' : '')}>{email.subject}</div>
    );
  }
}
