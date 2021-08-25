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
    console.log(note);
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

  render() {
    const { isExpanded, note } = this.state;
    return (
      <div className="note-add flex column">
        {isExpanded && <input type="text" name="title" placeholder="Title" value={note.info.title} onChange={this.handleChange} />}
        <input
          onClick={() => this.onExpand(true)}
          name={note.type === 'note-txt' ? 'txt' : 'url'}
          type="text"
          placeholder="Take a note..."
          value={note.type === 'note-txt' ? note.info.txt : note.info.url}
          onChange={this.handleChange}
        />
        {isExpanded && <NoteToolbar type="new-note" onUpdateType={this.onUpdateType} />}
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
