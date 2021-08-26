import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';
export const notesService = { query, addNote, updateNote, toggleTodo, isContainsPinnedNotes, duplicateNote, removeNote, createTodo };

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
        style: {
          backgroundColor: '#00d',
        },
      },
      {
        id: utilService.makeId(),
        type: 'note-img',
        isPinned: false,
        info: {
          url: 'https://i.insider.com/5484d9d1eab8ea3017b17e29?width=700&format=jpeg&auto=webp',
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
            { txt: 'Driving liscence', doneAt: null, id: utilService.makeId() },
            { txt: 'Coding power', doneAt: 187111111, id: utilService.makeId() },
          ],
        },
      },
      {
        id: utilService.makeId(),
        type: 'note-video',
        isPinned: false,
        info: {
          title: 'cool video',
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        },
      },
    ];
  _saveNotesToStorage(notes);
  return notes;
}

function query(criteria) {
  return new Promise((resolve) => setTimeout(resolve, 200, gNotes));
}

function isContainsPinnedNotes() {
  return gNotes.some(note => note.isPinned);
}

function createTodo(todoTxt) {
  return {
    txt: todoTxt,
    doneAt: null,
    id: utilService.makeId()
  }
}

function toggleTodo(noteId, todoId) {
  const currNoteIdx = gNotes.findIndex(note => note.id === noteId)
  const currTodoIdx = gNotes[currNoteIdx].info.todos.findIndex(todo => todo.id === todoId);
  console.log(gNotes[currNoteIdx]);
  console.log(gNotes[currNoteIdx].info.todos[currTodoIdx]);
  gNotes[currNoteIdx].info.todos[currTodoIdx];
  gNotes[currNoteIdx].info.todos[currTodoIdx].doneAt = gNotes[currNoteIdx].info.todos[currTodoIdx].doneAt ? null : Date.now();
  return Promise.resolve(gNotes[currNoteIdx]);
}

function removeNote(id) {
  const noteIdx = gNotes.findIndex(note => note.id === id);
  gNotes.splice(noteIdx, 1);
  _saveNotesToStorage(gNotes);
  return Promise.resolve(gNotes);
}

function duplicateNote(note) {
  const clone = JSON.parse(JSON.stringify(note));
  clone.id = utilService.makeId();
  gNotes.unshift(clone);
  _saveNotesToStorage(gNotes);
  return Promise.resolve(gNotes);
}

function updateNote(userNote) {
  const idx = gNotes.findIndex(note => note.id === userNote.id);
  gNotes[idx] = userNote;
  _saveNotesToStorage(gNotes);
  return Promise.resolve(gNotes);
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
