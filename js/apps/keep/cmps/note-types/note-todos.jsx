import { NoteToolbar } from '../note-toolbar.jsx';
export class NoteTodos extends React.Component {
  state = {};
  render() {
    const { todos } = this.props.note.info;
    return <div className="note-preview todos" style={this.props.note.style}>
      <NoteToolbar type="existed-note" onChangeColor={this.props.onChangeColor} />
    </div>;
  }
}
