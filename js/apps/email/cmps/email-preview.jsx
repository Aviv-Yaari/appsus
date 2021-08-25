import { utilService } from '../../../services/util.service.js';
const { Link } = ReactRouterDOM;
export class EmailPreview extends React.Component {
  state = {
    isExpanded: false,
  };

  onPreviewClick = () => {
    this.setState((prevState) => ({ isExpanded: !prevState.isExpanded }));
    this.props.onPreviewClick(this.props.email);
  };

  render() {
    const { isExpanded } = this.state;
    const { email } = this.props;
    return (
      <div
        onClick={this.onPreviewClick}
        className={'email-preview ' + (!email.isRead ? 'unread' : '')}>
        {email.subject}
        {isExpanded && (
          <div className="email-preview-expanded">
            <Link to={`/email/${email.id}`}>Full Page</Link>
            <h2>{email.subject}</h2>
            {utilService.formatDate(email.sentAt)}
          </div>
        )}
      </div>
    );
  }
}
