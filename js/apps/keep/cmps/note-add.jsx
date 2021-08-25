import { NoteToolbar } from './note-toolbar.jsx';

export class NoteAdd extends React.Component {
  state = {
    isExpanded: false,
    note: {
      type: 'note-txt',
      isPinned: false,
      info: { txt: '' },
      style: { backgroundColor: '#fff' },
    },
  };

  onExpand = (isExpanded) => {
    this.setState({ isExpanded });
  };

  handleChange = (ev) => {
    const { name, value } = ev.target;
    // const { type: noteType } = this.state.note.type;
    // const newInfo = {};
    // if (noteType === 'note-txt') newInfo.txt = value;
    // else if (noteType === 'note-img')
    this.setState((prevState) => ({ note: { ...prevState.note, info: { [name]: value } } }));
  };

  onAddClick = () => {
    const { note } = this.state;
    const { onAdd } = this.props;
    onAdd(note);
    this.setState({
      note: {
        type: 'note-txt',
        isPinned: false,
        info: { txt: '' },
        style: { backgroundColor: '#fff' },
      },
    });
  };

  render() {
    const { isExpanded, note } = this.state;
    return (
      <div className="note-add flex column">
        {isExpanded && <input type="text" name="title" placeholder="Title" />}
        <input
          onClick={() => this.onExpand(true)}
          name="txt"
          type="text"
          placeholder="Take a note..."
          value={note.info.txt}
          onChange={this.handleChange}
        />
        {isExpanded && <NoteToolbar />}
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
