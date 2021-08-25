import { NoteToolbar } from '../note-toolbar.jsx';
export class NoteImg extends React.Component {
  state = {};
  render() {
    const { url, title } = this.props.note.info;
    return (
      <div className="note-preview img" style={this.props.note.style}>
        {title && <h1>{title}</h1>}
        <img className="note-img" src={url} />
        <NoteToolbar type="existed-note" onChangeColor={this.props.onChangeColor} />
      </div>
    );
  }
}
