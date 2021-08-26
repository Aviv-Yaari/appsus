export class NoteToolbar extends React.Component {
  state = {
    isColorShown: false,
  };

  style = {
    opacity: this.props.type === 'existed-note' ? 0 : 1,
  }

  onOpenColors = () => {
    this.setState(prevState => ({ isColorShown: !prevState.isColorShown }))
  }

  onColorClicked = (color) => {
    this.props.onChangeColor(color);
    this.onOpenColors();
  }

  onToolClicked = (type) => {
    if (this.props.type === 'new-note') {
      this.props.onUpdateType(type);
    }
  }

  render() {
    const { isColorShown } = this.state;
    return (
      <React.Fragment>
        <div className="note-toolbar flex" style={this.style}>
          <img onClick={this.onOpenColors} src="../../../../assets/svg/pallete.svg" />
          <img onClick={() => this.onToolClicked('note-img')} src="../../../../assets/svg/image.svg" />
          <img onClick={() => this.onToolClicked('note-video')} src="../../../../assets/svg/video.svg" />
          <img onClick={() => this.onToolClicked('note-todos')} src="../../../../assets/svg/todos.svg" />
        </div>
        <div className={'colors' + (isColorShown ? ' shown' : '')}>
          <div className="color white" onClick={() => this.onColorClicked('#fff')}></div>
          <div className="color red" onClick={() => this.onColorClicked('#f28b82')}></div>
          <div className="color orange" onClick={() => this.onColorClicked('#fbbc04')}></div>
          <div className="color yellow" onClick={() => this.onColorClicked('#fff475')}></div>
          <div className="color green" onClick={() => this.onColorClicked('#ccff90')}></div>
          <div className="color turquoise" onClick={() => this.onColorClicked('#a7ffeb')}></div>
          <div className="color lightblue" onClick={() => this.onColorClicked('#cbf0f8')}></div>
          <div className="color blue" onClick={() => this.onColorClicked('#aecbfa')}></div>
        </div>
        <img className="note-pin" style={this.style} src={this.props.note.isPinned ? "../../../../assets/svg/pinned.svg" : "../../../../assets/svg/pin.svg"} onClick={() => this.props.onPinNote(this.props.note)} />


      </React.Fragment>
    );
  }
}

