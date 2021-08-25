export class NoteTodos extends React.Component {
  state = {};
  render() {
    const { todos } = this.props.note.info;
    return <div>{JSON.stringify(todos)}</div>;
  }
}
