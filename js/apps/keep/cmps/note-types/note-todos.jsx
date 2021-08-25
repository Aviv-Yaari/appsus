import { NoteToolbar } from '../note-toolbar.jsx';
export class NoteTodos extends React.Component {
  state = {
  };
  render() {
    const { todos } = this.props.note.info;
    return <div className="note-preview todos" style={this.props.note.style}>
      <ul className="clean-list">
        {todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.doneAt} onChange={() => { this.props.onCheckTodo(todo.id) }} />
            <span className={todo.doneAt ? 'checked' : ''} onClick={() => { this.props.onCheckTodo(todo.id) }}>{todo.txt}</span></li>
        ))}
      </ul>
      <NoteToolbar note={this.props.note} type="existed-note" onChangeColor={this.props.onChangeColor} onPinNote={this.props.onPinNote} />
    </div>;
  }
}
