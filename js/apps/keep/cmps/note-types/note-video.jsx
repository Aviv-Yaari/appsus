export class NoteVideo extends React.Component {
  state = {};
  render() {
    const { url } = this.props.note.info;
    return <div>{url}</div>;
  }
}
