export class NoteImg extends React.Component {
  state = {};
  render() {
    const { url, title } = this.props.note.info;
    return (
      <div>
        {title}, {url}
      </div>
    );
  }
}
