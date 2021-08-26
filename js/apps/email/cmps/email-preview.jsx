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
    const { email, onValueToggle, onTrash } = this.props;
    return (
      <div
        onClick={this.onPreviewClick}
        className={'email-preview ' + (!email.isRead ? 'unread' : '')}>
        <section className="email-mini flex align-center">
          <div className="email-star-subject flex align-center">
            <img
              className="email-star"
              onClick={(ev) => onValueToggle(ev, email, 'isStarred')}
              src={'assets/svg/star-' + (email.isStarred ? 'active' : 'disabled') + '.svg'}
            />
            <span className="email-subject">{email.subject}</span>
          </div>
          <div className="email-date">{utilService.formatDate(email.sentAt)}</div>
          <div className="email-actions flex">
            <img src={'assets/img/trash.png'} onClick={(ev) => onTrash(ev, email)} />
            <img
              src={'assets/img/' + (email.isRead ? 'unread' : 'read') + '.png'}
              onClick={(ev) => onValueToggle(ev, email, 'isRead')}
            />
          </div>
        </section>
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
