import { notesService } from '../services/note.service.js';
import { LoadingSpinner } from '../../../cmps/loading-spinner.jsx';
import { NotePanel } from '../cmps/note-panel.jsx';
import { NoteList } from '../cmps/note-list.jsx';
import { NoteAdd } from '../cmps/note-add.jsx';
import { eventBusService } from '../../../services/event-bus.service.js';
import { NoteEdit } from '../cmps/note-edit.jsx';
import { utilService } from '../../../services/util.service.js';

export class NoteIndex extends React.Component {
  state = {
    notes: null,
    criteria: { txt: '' },
  };

  componentDidMount() {
    this.loadNotes();
    this.removeEventBus = eventBusService.on('search', (data) => this.debbouncedFunc({ txt: data }));
  }

  componentWillUnmount() {
    this.removeEventBus();
  }

  loadNotes = () => {
    notesService.query(this.state.criteria).then((notes) => this.setState({ notes }));
  };

  onSetCriteria = (newCriteria) => {
    this.setState(
      (prevState) => ({ criteria: { ...prevState.criteria, ...newCriteria } }),
      this.loadNotes
    );
  };

  debbouncedFunc = utilService.debounce(this.onSetCriteria, 100);
  onAdd = (note) => {
    notesService.addNote(note).then(() => {
      this.loadNotes();
    });
  };

  render() {
    const { notes } = this.state;
    if (!notes) return <LoadingSpinner />;
    return (
      <section className="note-app flex">
        <section className="note-container flex column">
          <NoteAdd onAdd={this.onAdd} />
          <NoteList notes={notes} />
          {this.props.match.params.noteId && <NoteEdit />}
        </section>
      </section>
    );
  }
}
