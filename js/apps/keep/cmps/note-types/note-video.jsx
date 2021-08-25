import { NoteToolbar } from '../note-toolbar.jsx';
export class NoteVideo extends React.Component {
  state = {};
  render() {
    const { url } = this.props.note.info;
    return <div className="note-preview video" style={this.props.note.style}>
      
      <NoteToolbar type="existed-note" onChangeColor={this.props.onChangeColor} />
    </div>;
  }
}
