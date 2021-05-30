<template>
  <div v-if="useNoteState.state.currentNote.noteTitle" id="editor">
    <div class="editor-header">
      <input
        class="title"
        type="text"
        name="noteTitle"
        :value="useNoteState.state.currentNote.noteTitle"
        @input="updateNoteTitle"
      />
      <span
        @click="
          saveNote(
            newNoteTitle,
            newNoteBody,
            category,
            useNoteState.state.currentNote
          )
        "
        ><i class="far fa-save"></i
      ></span>

      <span @click="handleDeleteNote()"><i class="far fa-trash-alt"></i></span>
    </div>
    <textarea
      name="noteBody"
      :value="useNoteState.state.currentNote.noteBody"
      @input="updateNoteBody"
    ></textarea>
  </div>
</template>

<script>
import { inject, ref } from "vue";

export default {
  name: "NoteEditor",
  props: ["category"],

  setup() {
    const useNoteState = inject("useNoteState");
    const { editNote } = useNoteState;

    const newNoteTitle = ref(null);
    const newNoteBody = ref(null);

    const updateNoteTitle = (e) => (newNoteTitle.value = e.target.value);
    const updateNoteBody = (e) => (newNoteBody.value = e.target.value);

    const saveNote = (noteTitle, noteBody, category, oldNote) => {
      const updatedNote = { noteTitle, noteBody };
      editNote(updatedNote, category.currentCategory, oldNote);

      newNoteTitle.value = null;
      newNoteBody.value = null;
    };

    return {
      useNoteState,

      newNoteTitle,
      newNoteBody,
      updateNoteTitle,
      updateNoteBody,

      saveNote,
    };
  },
};
</script>

<style lang="scss">
#editor {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100%;
  width: 70%;
  color: #333;
}

.editor-header {
  display: flex;
  background-color: #fafafa;

  input {
    width: 100%;
  }

  span {
    margin: auto 1em;
    cursor: pointer;
  }
}

.title {
  justify-content: left;
  padding-left: 0.5em;
  font-size: 16px;
  background-color: #fafafa;
  font-weight: 600;
  border-radius: 0;
  border-bottom: 1px solid grey;
  outline: none;
}

textarea {
  display: inline-block;
  height: 100%;
  width: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #fafafa;
  font-size: 14px;
  padding: 20px;
}

.editor-footer {
  display: flex;
  justify-content: space-between;

  .tags {
    display: flex;
    flex-wrap: wrap;
    span {
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      color: #fff;
      margin: 0.5em;
    }
  }

  .actions {
    display: flex;

    span {
      padding: 5px 10px;
      border-radius: 5px;
      background-color: grey;
      cursor: pointer;
      color: #000;
      margin: auto 0.5em;
      height: 1.5em;
    }

    select {
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      margin: auto 0.5em;
      height: 2.5em;

      option {
        font-size: 16px;
      }
    }
  }
}
</style>