import { NotePreview } from './note-preview.jsx';

export const NoteList = ({ notes }) => {
  return (
    <div className="note-list flex">
      {notes.map((note) => (
        <NotePreview key={note.id} note={note} />
      ))}
    </div>
  );
};
