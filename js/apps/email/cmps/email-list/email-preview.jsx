import { utilService } from '../../../../services/util.service.js';
import { BtnExportNote } from '../btns/btn-export-note.jsx';
import { BtnFullscreen } from '../btns/btn-fullscreen.jsx';
import { BtnRead } from '../btns/btn-read.jsx';
import { BtnReply } from '../btns/btn-reply.jsx';
import { BtnStar } from '../btns/btn-star.jsx';
import { BtnTrash } from '../btns/btn-trash.jsx';
import { EmailPreviewExpanded } from './email-preview-expanded.jsx';

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
    const { email, onValueToggle, onTrash, onFullScreen, onExportNote, onReply } = this.props;
    return (
      <div
        onClick={this.onPreviewClick}
        className={'email-preview ' + (!email.isRead ? 'unread' : '')}>
        <section className="email-mini flex align-center">
          <div className="email-star-subject flex align-center">
            <BtnStar onToggle={(ev) => onValueToggle(ev, email, 'isStarred')} email={email} />
            <span className="email-subject">
              {utilService.trimText(email.subject, 100) || 'no subject'}
            </span>
          </div>
          <div className="email-date">{utilService.formatDate(email.sentAt)}</div>
          <div className="email-actions flex">
            <BtnReply onClick={(ev) => onReply(email, ev)} />
            <BtnTrash onTrash={(ev) => onTrash(ev, email)} />
            <BtnRead email={email} onToggle={(ev) => onValueToggle(ev, email, 'isRead')} />
            <BtnExportNote onExport={(ev) => onExportNote(email, ev)} />
            <BtnFullscreen onFullScreen={() => onFullScreen(email.id)} />
          </div>
        </section>
        {isExpanded && <EmailPreviewExpanded email={email} />}
      </div>
    );
  }
}
