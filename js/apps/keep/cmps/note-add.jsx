import { NoteToolbar } from './note-toolbar.jsx';

export class NoteAdd extends React.Component {
  state = {
    isExpanded: false,
    note: {
      type: 'note-txt',
      isPinned: false,
      info: { txt: '', title: '' },
      style: { backgroundColor: '#fff' },
    },
  };

  onExpand = (isExpanded) => {
    this.setState({ isExpanded });
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    // const { type: noteType } = this.state.note.type;
    // const newInfo = {};
    // if (noteType === 'note-txt') newInfo.txt = value;
    // else if (noteType === 'note-img')
    this.setState((prevState) => ({ note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } } }));
  };

  onUpdateType = (type) => {
    this.setState(prevState => ({ note: { ...prevState.note, type } }))
  }

  onAddClick = () => {
    const { note } = this.state;
    const { onAdd } = this.props;
    onAdd(note);
    this.setState({
      note: {
        type: 'note-txt',
        isPinned: false,
        info: { txt: '', title: '' },
        style: { backgroundColor: '#fff' },
      },
    });
  };


  getInputValues = () => {
    const { note } = this.state;
    if (note.type === 'note-txt') {
      return {
        value: note.info.txt,
        name: 'txt',
        placeholder: 'Add a note...'
      }
    } else if (note.type === 'note-img') {
      return {
        value: note.info.url,
        name: 'url',
        placeholder: 'Add image url...'
      }
    } else if (note.type === 'note-video') {
      return {
        value: note.info.url,
        name: 'url',
        placeholder: 'Add video url...'
      }
    } else if (note.type === 'note-todo') {
      return {
        value: note.info.todos,
        name: 'todos',
        placeholder: 'Add todos, sepreate them by comma...'
      }
    }
  }

  onPinNote = () => {
    this.setState(prevState => ({ note: { ...prevState.note, isPinned: !prevState.note.isPinned } }))
  }


  render() {
    const { isExpanded, note } = this.state;
    const inputValues = this.getInputValues();
    return (
      <div className="note-add flex column">
        {isExpanded && <input type="text" name="title" placeholder="Title" value={note.info.title} onChange={this.handleChange} />}
        <input
          onClick={() => this.onExpand(true)}
          name={inputValues.name || ''}
          type="text"
          placeholder={inputValues.placeholder}
          value={inputValues.value || ''}
          onChange={this.handleChange}
        />
        {isExpanded && <NoteToolbar note={note} type="new-note" onUpdateType={this.onUpdateType} onPinNote={this.onPinNote} />}
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
