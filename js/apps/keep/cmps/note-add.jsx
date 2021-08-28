import { notesService } from '../services/note.service.js';
import { NoteToolbar } from './note-toolbar.jsx';
const { withRouter } = ReactRouterDOM;

class _NoteAdd extends React.Component {
  state = {
    isExpanded: false,
    note: {
      type: 'note-txt',
      isPinned: false,
      info: { txt: '', title: '' },
      style: { backgroundColor: '#fff' },
    },
    extraInputsCount: 0,
    todosValues: [''],
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const txt = query.get('txt') || '';
    const title = query.get('title') || '';
    if (!txt && !title) return;
    this.setState((prevState) => ({
      isExpanded: true,
      note: { ...prevState.note, info: { txt, title } },
    }));
  }

  onExpand = (isExpanded) => {
    this.setState({ isExpanded });
    if (!isExpanded) {
      this.setState({
        note: {
          type: 'note-txt',
          isPinned: false,
          info: { txt: '', title: '' },
          style: { backgroundColor: '#fff' },
        },
      });
      this.setState({ extraInputsCount: 0 })
      this.setState({ todosValues: [''] })
    }
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    if (this.state.note.type === 'note-todos') {
      const todoIdx = field.substring(field.indexOf('s') + 1);
      const newTodosValues = [...this.state.todosValues];
      newTodosValues[todoIdx] = value;
      this.setState({ todosValues: newTodosValues });
      if (field === 'title') {
        this.setState((prevState) => ({
          note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } },
        }));
      }
      return;
    }
    this.setState((prevState) => ({
      note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } },
    }));
  };

  onUpdateType = (type) => {
    this.setState((prevState) => ({ note: { ...prevState.note, type } }));
    this.setState({ extraInputsCount: 0 });
  };

  onAddClick = () => {
    const { note } = this.state;
    const { onAdd } = this.props;
    if (note.type === 'note-todos') {
      note.info.todos = this.state.todosValues.map((todoValue) =>
        notesService.createTodo(todoValue)
      );
    }
    onAdd(note);
    this.setState({
      note: {
        type: 'note-txt',
        isPinned: false,
        info: { txt: '', title: '' },
        style: { backgroundColor: '#fff' },
      },
    });
    this.setState({ extraInputsCount: 0 })
    this.setState({ todosValues: [''] })
  };

  getInputValues = () => {
    const { note } = this.state;
    if (note.type === 'note-txt') {
      return {
        value: note.info.txt,
        name: 'txt',
        placeholder: 'Add a note...',
      };
    } else if (note.type === 'note-img') {
      return {
        value: note.info.url,
        name: 'url',
        placeholder: 'Add image url...',
      };
    } else if (note.type === 'note-video') {
      return {
        value: note.info.url,
        name: 'url',
        placeholder: 'Add video url...',
      };
    } else if (note.type === 'note-todos') {
      return {
        value: this.state.todosValues[0],
        name: 'todos0',
        placeholder: 'Add todo...',
      };
    }
  };

  onAddTodo = () => {
    this.setState((prevState) => ({ extraInputsCount: prevState.extraInputsCount + 1 }));
    this.setState((prevState) => ({ todosValues: [...prevState.todosValues, ''] }));
  };
  onRemoveTodo = (idx) => {
    this.setState((prevState) => ({ extraInputsCount: prevState.extraInputsCount - 1 }));
    const newTodosValues = [...this.state.todosValues];
    newTodosValues.splice(idx, 1);
    if (idx === 1) {
      newTodosValues[0] = this.state.todosValues[0];
    }
    this.setState({ todosValues: newTodosValues });
  };

  onPinNote = () => {
    this.setState((prevState) => ({
      note: { ...prevState.note, isPinned: !prevState.note.isPinned },
    }));
  };

  onChangeColor = (color) => {
    const updatedNote = { ...this.state.note, style: { backgroundColor: color } };
    this.setState({ note: updatedNote });
  };

  render() {
    const { isExpanded, note, extraInputsCount, todosValues } = this.state;
    const inputValues = this.getInputValues();
    return (
      <div className="note-add flex column" style={this.state.note.style}>
        {isExpanded && (
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={note.info.title}
            onChange={this.handleChange}
          />
        )}
        <input
          onClick={() => this.onExpand(true)}
          name={inputValues.name || ''}
          type="text"
          placeholder={inputValues.placeholder}
          value={inputValues.value || ''}
          onChange={this.handleChange}
        />
        {isExpanded &&
          note.type == 'note-todos' &&
          new Array(extraInputsCount).fill(0).map((val, idx) => (
            <div className="todo" key={idx}>
              <input
                name={'todos' + (idx + 1)}
                type="text"
                placeholder="Add todo..."
                value={todosValues[idx + 1]}
                onChange={this.handleChange}
              />
              <img src="assets/svg/delete-todo.svg" onClick={() => this.onRemoveTodo(idx + 1)} />
            </div>
          ))}
        {note.type === 'note-todos' && (
          <img src="assets/svg/add-todo.svg" className="add-todo-img" onClick={this.onAddTodo} />
        )}
        {isExpanded && (
          <NoteToolbar
            note={note}
            type="new-note"
            onUpdateType={this.onUpdateType}
            onPinNote={this.onPinNote}
            onChangeColor={this.onChangeColor}
          />
        )}
        {isExpanded && (
          <button className="note-btn-add" onClick={this.onAddClick}>
            Add
          </button>
        )}
        {isExpanded && (
          <button className="note-btn-close" onClick={() => this.onExpand(false)}>
            Close
          </button>
        )}
      </div>
    );
  }
}

export const NoteAdd = withRouter(_NoteAdd);
