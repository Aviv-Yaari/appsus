import { NoteImg } from './note-types/note-img.jsx';
import { NoteText } from './note-types/note-text.jsx';
import { NoteTodos } from './note-types/note-todos.jsx';
import { NoteVideo } from './note-types/note-video.jsx';

export class NotePreview extends React.Component {
  state = {};
  render() {
    const { note } = this.props;
    const DynamicCmp = (props) => {
      const cmpMap = {
        'note-txt': <NoteText {...props} />,
        'note-img': <NoteImg {...props} />,
        'note-todos': <NoteTodos {...props} />,
        'note-video': <NoteVideo {...props} />,
      };
      return cmpMap[note.type] || <div>Not found</div>;
    };
    return (
      <div>
        <DynamicCmp note={note} />
      </div>
    );
  }
}
