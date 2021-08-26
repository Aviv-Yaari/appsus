import { NoteToolbar } from '../note-toolbar.jsx';
export class NoteVideo extends React.Component {
  state = {};
  render() {
    const { url, title } = this.props.note.info;
    return (
      <div className="note-preview video" style={this.props.note.style}>
        {title && <h1>{title}</h1>}
        <iframe className="note-video" src={url} allow="fullscreen"></iframe>
        <NoteToolbar
          note={this.props.note}
          type="existed-note"
          onChangeColor={this.props.onChangeColor}
          onPinNote={this.props.onPinNote}
          onDuplicateNote={this.props.onDuplicateNote}
          onRemoveNote={this.props.onRemoveNote}
          onExportEmail={this.props.onExportEmail}/>
      </div>
    );
  }
}
