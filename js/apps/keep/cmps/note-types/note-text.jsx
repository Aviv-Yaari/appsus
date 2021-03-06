import { NoteToolbar } from '../note-toolbar.jsx';

export class NoteText extends React.Component {
  render() {
    const { txt, title, labels } = this.props.note.info;
    return (
      <div className="note-preview txt" style={this.props.note.style}>
        {title && <h1 onBlur={(ev) => { this.props.onBlur(ev.target.innerText, title, 'title') }} contentEditable suppressContentEditableWarning={true}>{title}</h1>}
        <p onBlur={(ev) => { this.props.onBlur(ev.target.innerText, txt, 'txt') }} contentEditable suppressContentEditableWarning={true}>{txt}</p>
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
          onAddLabel={this.props.onAddLabel}
          onExportEmail={this.props.onExportEmail}
        />
      </div>
    );
  }
}
