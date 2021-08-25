import { notesService } from '../services/note.service.js';
import { LoadingSpinner } from '../../../cmps/loading-spinner.jsx';
import { NotePanel } from '../cmps/note-panel.jsx';
import { NoteList } from '../cmps/note-list.jsx';
import { NoteAdd } from '../cmps/note-add.jsx';

export class NoteIndex extends React.Component {
  state = { notes: null };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    notesService.query().then((notes) => this.setState({ notes }));
  };

  onPreviewClick = () => {};

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
          <NoteList notes={notes} onPreviewClick={this.onPreviewClick} />
        </section>
      </section>
    );
  }
}
