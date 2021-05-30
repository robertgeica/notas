import { reactive, readonly } from 'vue';
import useCategoryState from '@/store/useCategoryState';

const state = reactive({
  currentNote: {},
});

const getters = {
  getCurrentNote: (note) => {
    state.currentNote = note;
  },
};
const actions = {
  editNote: async (updatedNote, currentCategory, oldNote) => {
    if (updatedNote.noteTitle === null && updatedNote.noteBody === null) {
      console.log('null values');
      return;
    }

    const newCategory = JSON.parse(JSON.stringify(currentCategory));
    const noteIndex = newCategory.notes.findIndex(
      (note) => note.noteTitle === oldNote.noteTitle
    );

    const note = currentCategory.notes[noteIndex];
    const newNoteTitle =
      updatedNote.noteTitle === null ? note.noteTitle : updatedNote.noteTitle;
    const newNoteBody =
      updatedNote.noteBody === null ? note.noteBody : updatedNote.noteBody;

    const newNote = {
      noteTitle: newNoteTitle,
      noteBody: newNoteBody,
      noteTags: [...note.noteTags],
    };

    newCategory.notes[noteIndex] = newNote;

    const res = await fetch(
      `http://localhost:5000/category/${currentCategory.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      }
    );
    // await getAllCategories();
    state.currentNote = newNote;
    useCategoryState.getCurrentCategory(currentCategory.id);
  },
};

export default { state: readonly(state), ...getters, ...actions };
