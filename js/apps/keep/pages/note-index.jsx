import { notesService } from '../services/note.service.js';
import { LoadingSpinner } from '../../../cmps/loading-spinner.jsx';
import { NotePanel } from '../cmps/note-panel.jsx';
import { NoteList } from '../cmps/note-list.jsx';
import { NoteAdd } from '../cmps/note-add.jsx';
import { eventBusService } from '../../../services/event-bus.service.js';

export class NoteIndex extends React.Component {
  state = {
    notes: null,
    criteria: { txt: '' }
  };

  componentDidMount() {
    this.loadNotes();
    this.removeEventBus = eventBusService.on('search', (data) => this.onSetCriteria({ txt: data }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.criteria.txt !== this.state.criteria.txt) {
      this.onSetCriteria({ txt: this.state.criteria.txt });
    }
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
        <aside className="left-panel">
          <NotePanel />
        </aside>
        <section className="note-container flex column">
          <NoteAdd onAdd={this.onAdd} />
          <NoteList notes={notes}/>
        </section>
      </section>
    );
  }
}
