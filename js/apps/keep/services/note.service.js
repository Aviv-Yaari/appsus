import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';
export const notesService = { query, addNote };

let gNotes = _initNotes();

function _initNotes() {
  let notes = storageService.loadFromStorage('notes-db');
  if (notes) return notes;
  else
    notes = [
      {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: utilService.makeId(),
        type: 'note-img',
        isPinned: false,
        info: {
          url: 'http://some-img/me',
          title: 'Bobi and Me',
        },
        style: {
          backgroundColor: '#00d',
        },
      },
      {
        id: utilService.makeId(),
        type: 'note-todos',
        isPinned: false,
        info: {
          label: 'Get my stuff together',
          todos: [
            { txt: 'Driving liscence', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
    ];
  _saveNotesToStorage(notes);
  return notes;
}

function query(criteria) {
  return new Promise((resolve) => setTimeout(resolve, 200, gNotes));
}

function addNote(userNote) {
  userNote.id = utilService.makeId();
  gNotes.unshift(userNote);
  _saveNotesToStorage(gNotes);
  return Promise.resolve(gNotes);
}

function _saveNotesToStorage(notes) {
  storageService.saveToStorage('notes-db', notes);
}
