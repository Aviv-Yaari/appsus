const { withRouter } = ReactRouterDOM
class _NoteToolbar extends React.Component {
  state = {
  };

  style = {
    opacity: this.props.type === 'existed-note' ? 0 : 1,
  }

  onColorClicked = (color) => {
    this.props.onChangeColor(color);
  }

  onToolClicked = (type) => {
    if (this.props.type === 'new-note') {
      this.props.onUpdateType(type);
    }
  }

  onEditNote = () => {
    this.props.history.push(`/keep/${this.props.note.id}`)
  }

  render() {
    const { type } = this.props;
    return (
      <React.Fragment>
        <div className="note-toolbar flex" style={this.style}>
          <img title="Change color" onClick={this.onOpenColors} src="assets/svg/pallete.svg" />
          <div className="colors">
            <div className="color white" onClick={() => this.onColorClicked('#fff')}></div>
            <div className="color red" onClick={() => this.onColorClicked('#f28b82')}></div>
            <div className="color orange" onClick={() => this.onColorClicked('#fbbc04')}></div>
            <div className="color yellow" onClick={() => this.onColorClicked('#fff475')}></div>
            <div className="color green" onClick={() => this.onColorClicked('#ccff90')}></div>
            <div className="color turquoise" onClick={() => this.onColorClicked('#a7ffeb')}></div>
            <div className="color lightblue" onClick={() => this.onColorClicked('#cbf0f8')}></div>
            <div className="color blue" onClick={() => this.onColorClicked('#aecbfa')}></div>
            <div className="color purple" onClick={() => this.onColorClicked('#d7aefb')}></div>
            <div className="color pink" onClick={() => this.onColorClicked('#fdcfe8')}></div>
            <div className="color brown" onClick={() => this.onColorClicked('#e6c9a8')}></div>
            <div className="color gray" onClick={() => this.onColorClicked('#e8eaed')}></div>
          </div>

          {type === 'new-note' && <img title="Add text" onClick={() => this.onToolClicked('note-txt')} src="assets/svg/text.svg" />}
          {type === 'new-note' && <img title="Add image" onClick={() => this.onToolClicked('note-img')} src="assets/svg/image.svg" />}
          {type === 'new-note' && <img title="Add video" onClick={() => this.onToolClicked('note-video')} src="assets/svg/video.svg" />}
          {type === 'new-note' && <img title="Add todos" onClick={() => this.onToolClicked('note-todos')} src="assets/svg/todos.svg" />}
          {type === 'existed-note' && <img title="Edit note" onClick={this.onEditNote} src="assets/svg/edit.svg" />}
          {type === 'existed-note' && <img title="Add label" src="assets/svg/label.svg" />}
          {type === 'existed-note' && <img title="Duplicate note" onClick={() => this.props.onDuplicateNote(this.props.note)} src="assets/svg/duplicate.svg" />}
          {type === 'existed-note' && <img title="Delete note" onClick={() => this.props.onRemoveNote(this.props.note.id)} src="assets/svg/delete.svg" />}
          {type === 'existed-note' && <img title="Export as email" onClick={this.props.onExportEmail} src="assets/svg/forward-email.svg" />}
        </div>
        <img className="note-pin" title="Pin note" style={this.style} src={this.props.note.isPinned ? "assets/svg/pinned.svg" : "assets/svg/pin.svg"} onClick={() => this.props.onPinNote(this.props.note)} />


      </React.Fragment>
    );
  }
}

export const NoteToolbar = withRouter(_NoteToolbar);
