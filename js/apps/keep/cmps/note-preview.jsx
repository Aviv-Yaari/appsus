import { NoteImg } from './note-types/note-img.jsx';
import { NoteText } from './note-types/note-text.jsx';
import { NoteTodos } from './note-types/note-todos.jsx';
import { NoteVideo } from './note-types/note-video.jsx';
import { notesService } from '../services/note.service.js';
const { withRouter } = ReactRouterDOM;

class _NotePreview extends React.Component {
  state = {
    note: this.props.note,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.note !== this.props.note) {
      this.setState({ note: this.props.note });
    }
  }

  onChangeColor = (color) => {
    const updatedNote = { ...this.state.note, style: { backgroundColor: color } };
    notesService.updateNote(updatedNote);
    this.setState({ note: updatedNote });
  };
  onCheckTodo = (todoId) => {
    notesService
      .toggleTodo(this.state.note.id, todoId)
      .then((updatedNote) => this.setState({ note: updatedNote }));
  };

  onExportEmail = () => {
    const { note } = this.state;
    let body;
    switch (note.type) {
      case 'note-txt':
        body = note.info.txt;
        break;
      case 'note-video':
        body = 'Check out this video: ' + note.info.url;
        break;
      case 'note-img':
        body = 'Check out this image: ' + note.info.url;
        break;
      case 'note-todos':
        const todosTxts = note.info.todos.map((todo) => todo.txt);
        body = 'Todos: \n• ' + todosTxts.join('\n• ');
        break;
      default:
        body = 'no body';
        break;
    }
    this.props.history.push(
      `/emails/inbox?subject=${note.info.title || 'no subject'}&to=muki@gmail.com&body=${body || 'no body'
      }`
    );
  };

  onRemoveLabel = (label) => {
    notesService.removeLabel(label, this.state.note.id).then((note) => {
      this.setState({ note });
    });
  };

  onAddLabel = (label) => {
    notesService.addLabel(label, this.state.note.id).then((note) => {
      this.setState({ note });
    });
  }

  onBlur = (newTxt, prevTxt, type, todoId) => {
    let updatedNote;
    if (newTxt === prevTxt) return;
    const { note } = this.state;
    if (type === 'title') {
      updatedNote = { ...note, info: { ...note.info, title: newTxt } }
    } else if (type === 'txt') {
      updatedNote = { ...note, info: { ...note.info, txt: newTxt } }
    } else if (type === 'todo') {
      const todoIdx = note.info.todos.findIndex(todo => todo.id === todoId);
      const newTodos = [...note.info.todos];
      newTodos[todoIdx].txt = newTxt;
      updatedNote = { ...note, info: { ...note.info, todos: newTodos } };
    }
    notesService.updateNote(updatedNote);
    this.setState({ note: updatedNote });
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
        <DynamicCmp
          note={note}
          onChangeColor={this.onChangeColor}
          onCheckTodo={this.onCheckTodo}
          onPinNote={this.props.onPinNote}
          onDuplicateNote={this.props.onDuplicateNote}
          onRemoveNote={this.props.onRemoveNote}
          onExportEmail={this.onExportEmail}
          onAddLabel={this.onAddLabel}
          onRemoveLabel={this.onRemoveLabel}
          onBlur={this.onBlur}
        />
      </React.Fragment>
    );
  }
}
export const NotePreview = withRouter(_NotePreview);
