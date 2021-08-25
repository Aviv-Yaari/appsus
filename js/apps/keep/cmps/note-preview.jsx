import { NoteImg } from './note-types/note-img.jsx';
import { NoteText } from './note-types/note-text.jsx';
import { NoteTodos } from './note-types/note-todos.jsx';
import { NoteVideo } from './note-types/note-video.jsx';
import { notesService } from '../services/note.service.js';

export class NotePreview extends React.Component {
  state = {
    note: this.props.note
  };
  onChangeColor = (color) => {
    const updatedNote = { ...this.state.note, style: { backgroundColor: color } }
    notesService.updateNote(updatedNote);
    this.setState({ note: updatedNote })
  }
  onCheckTodo = (todoId) => {
    notesService.toggleTodo(this.state.note.id, todoId).then(updatedNote =>
      this.setState({ note: updatedNote })
    );
  }
 
  render() {
    const { note } = this.state;
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
      <React.Fragment>
        <DynamicCmp note={note} onChangeColor={this.onChangeColor} onCheckTodo={this.onCheckTodo} onPinNote={this.props.onPinNote} />
      </React.Fragment>
    );
  }
}
