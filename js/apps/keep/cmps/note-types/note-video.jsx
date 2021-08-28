import { NoteToolbar } from '../note-toolbar.jsx';
export class NoteVideo extends React.Component {
  state = {};
  render() {
    const { url, title, labels } = this.props.note.info;
    return (
      <div className="note-preview video" style={this.props.note.style}>
        {title && <h1 onBlur={(ev) => { this.props.onBlur(ev.target.innerText, title, 'title') }} contentEditable suppressContentEditableWarning={true}>{title}</h1>}
        <iframe className="note-video" src={url} allow="fullscreen"></iframe>
        <div className="labels-container">
          {labels && labels.map((label, idx) => <div key={idx} className="label"><div>{label}</div><img onClick={() => this.props.onRemoveLabel(label)} src="assets/svg/delete-label.svg"></img></div>)}
        </div>
        <NoteToolbar
          note={this.props.note}
          type="existed-note"
          onChangeColor={this.props.onChangeColor}
          onPinNote={this.props.onPinNote}
          onDuplicateNote={this.props.onDuplicateNote}
          onRemoveNote={this.props.onRemoveNote}
          onExportEmail={this.props.onExportEmail} />
      </div>
    );
  }
}
