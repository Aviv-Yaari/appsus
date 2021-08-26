import { notesService } from '../services/note.service.js';
import { NotePreview } from './note-preview.jsx';

export class NoteList extends React.Component {
  state = {
    notes: this.props.notes
  }
  onPinNote = (currNote) => {
    const updatedNote = { ...currNote, isPinned: !currNote.isPinned }
    notesService.updateNote(updatedNote).then(notes => this.setState({ notes }))
  }
  onDuplicateNote = (currNote) => {
    notesService.duplicateNote(currNote).then(notes => this.setState({ notes }));
  }
  onRemoveNote = (noteId) => {
    notesService.removeNote(noteId).then(notes => this.setState({ notes }));
  }

  render() {
    const isPinnedShown = notesService.isContainsPinnedNotes();
    const { notes } = this.state;
    return (
      <React.Fragment>
        {isPinnedShown && <span className="pin-title">Pinned</span>}
        {isPinnedShown && <div className="note-list flex align-center">
          {notes.filter(note => note.isPinned).map((note) => (
            <NotePreview key={note.id} note={note} onPinNote={this.onPinNote} onDuplicateNote={this.onDuplicateNote} onRemoveNote={this.onRemoveNote} />
          ))}
        </div>}
        {isPinnedShown && <span className="others-title">Others</span>}
        {isPinnedShown && <div className="note-list flex align-center">
          {notes.filter(note => !note.isPinned).map((note) => (
            <NotePreview key={note.id} note={note} onPinNote={this.onPinNote} onDuplicateNote={this.onDuplicateNote} onRemoveNote={this.onRemoveNote} />
          ))}
        </div>}
        {!isPinnedShown && <div className="note-list flex align-center">
          {notes.map((note) => (
            <NotePreview key={note.id} note={note} onPinNote={this.onPinNote} onDuplicateNote={this.onDuplicateNote} onRemoveNote={this.onRemoveNote} />
          ))}
        </div>}
      </React.Fragment>
    );
  }
};
