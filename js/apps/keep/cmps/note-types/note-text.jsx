export class NoteText extends React.Component {
  state = {};
  render() {
    const { txt } = this.props.note.info;
    return <div>{txt}</div>;
  }
}
