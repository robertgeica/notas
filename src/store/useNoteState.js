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
  addNote: async (category, newNote, noteTags) => {
    // console.log('category', category, 'newNote', newNote, 'noteTags', noteTags);
    if (!newNote.noteTitle) {
      alert('Add a title for this note');
      return;
    }

    newNote.noteTags = noteTags;
    const newCategory = {
      ...category,
      notes: [...category.notes, newNote],
    };

    const res = await fetch(`http://localhost:5000/category/${category.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });

    useCategoryState.getCurrentCategory(category.id);
    console.log(useCategoryState);
    await useCategoryState.getAllCategories();
  },
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
  deleteNote: async (noteTitle, category) => {
    const newCategory = {
      ...category,
      notes: category.notes.filter((note) => note.noteTitle !== noteTitle),
    };

    const res = await fetch(`http://localhost:5000/category/${category.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });

    state.currentNote = {};
    useCategoryState.getCurrentCategory(category.id);
    await useCategoryState.getAllCategories();
  },

  addTagToNote: async (newTagName, allTags, note, category) => {
    if (newTagName === null) {
      return console.log('no tag selected');
    }

    const tagId = allTags.filter((tag) => tag.tagName === newTagName);
    const isTagAdded = note.noteTags.filter((id) => id === tagId[0].id);
    if (isTagAdded.length !== 0) {
      console.log('tag already exist');
      return;
    }
    const tag = allTags.filter((tag) => tag.tagName == newTagName);

    const newNote = {
      ...note,
      noteTags: [...note.noteTags, tag[0].id],
    };

    const objIndex = category.notes.findIndex(
      (obj) => obj.noteTitle === note.noteTitle
    );

    const newCategory = JSON.parse(JSON.stringify(category));

    newCategory.notes[objIndex] = { ...newNote };

    await fetch(`http://localhost:5000/category/${category.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });

    useCategoryState.getCurrentCategory(category.id);
    state.currentNote = newNote;
  },
  deleteTagFromNote: async (tagId, note, category) => {
    console.log(tagId, note, category);
    const newNote = {
      ...note,
      noteTags: note.noteTags.filter((tag) => tag !== tagId),
    };

    const objIndex = category.notes.findIndex(
      (obj) => obj.noteTitle === note.noteTitle
    );

    const newCategory = JSON.parse(JSON.stringify(category));

    newCategory.notes[objIndex] = { ...newNote };

    await fetch(`http://localhost:5000/category/${category.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });

    useCategoryState.getCurrentCategory(category.id);
    state.currentNote = newNote;
  },
};

export default { state: readonly(state), ...getters, ...actions };
