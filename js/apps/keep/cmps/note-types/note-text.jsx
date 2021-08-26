import { NoteToolbar } from '../note-toolbar.jsx';

export class NoteText extends React.Component {

  render() {
    const { txt, title } = this.props.note.info;
    return (
      <div className="note-preview txt" style={this.props.note.style}>
        {title && <h1>{title}</h1>}
        <p>{txt}</p>
        <NoteToolbar note={this.props.note} type="existed-note" onChangeColor={this.props.onChangeColor} onPinNote={this.props.onPinNote} />
      </div >
    )
  }
}
