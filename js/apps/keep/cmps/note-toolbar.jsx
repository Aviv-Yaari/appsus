export class NoteToolbar extends React.Component {
  state = {};
  render() {
    return (
      <div className="note-toolbar flex">
        <img src="../../../../assets/svg/pallete.svg" />
        <img src="../../../../assets/svg/image.svg" />
        <img src="../../../../assets/svg/video.svg" />
        <img src="../../../../assets/svg/todos.svg" />
        <img className="note-pin" src="../../../../assets/svg/pin.svg" />
      </div>
    );
  }
}
