<template>
  <div class="sidebar">
    <div v-if="selectedCategory.categoryName" class="note-actions">
      <h3>{{ selectedCategory.categoryName }}</h3>
      <button
        class="button"
        @click="$emit('delete-category', selectedCategory.id)"
      >
        Delete category
      </button>

      <button class="button" @click="toggleEditCategoryModal()">
        Edit category
      </button>

      <div v-if="editCategoryModal">
        <Modal @close="toggleEditCategoryModal">
          <template v-slot:actions>
            <input
              type="text"
              v-model="selectedCategory.categoryName"
              class="input"
              placeholder="Category title"
            />

            <button
              @click="
                $emit('edit-category', selectedCategory);
                toggleEditCategoryModal();
              "
            >
              Edit note
            </button>
          </template>

          <p>Edit note</p>
        </Modal>
      </div>
    </div>

    <div v-if="selectedCategory.categoryName" class="note-actions">
      <input
        type="text"
        placeholder="search"
        v-model="search"
        @keyup="searchNote"
      />
      <button @click="toggleNoteModal()">Add note</button>
    </div>

    <div v-if="showNoteModal">
      <Modal @close="toggleNoteModal">
        <template v-slot:actions>
          <input
            type="text"
            v-model="newNote.noteTitle"
            class="input"
            placeholder="Note title"
          />
          <input
            type="text"
            v-model="newNote.noteBody"
            class="input"
            placeholder="Note Body"
          />

          <div>
            <select name="tags" v-model="noteTag">
              <option :key="tag.tagName" v-for="tag in tags">
                {{ tag.tagName }} {{ tag.tagColor }}
              </option>
            </select>
          </div>

          <button
            @click="
              $emit('add-note', selectedCategory, newNote, noteTag);
              toggleNoteModal();
            "
          >
            Add note
          </button>
        </template>

        <p>Add new note</p>
      </Modal>
    </div>

    <div
      :key="note"
      v-for="note in notes || selectedCategory.notes"
      @click="$emit('get-note', note)"
      class="note"
    >
      <h4>{{ note.noteTitle }}</h4>
      <span
        :key="tag"
        v-for="tag in note.noteTags"
        :style="{
          background: `${tag.tagColor} `,
        }"
      >
        {{ tag.tagName }}
      </span>
      <p>{{ note.noteBody.substr(0, 100) }} ...</p>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";

export default {
  name: "Notes",
  props: ["selectedCategory", "tags"],
  components: { Modal },
  data() {
    return {
      showNoteModal: false,
      editCategoryModal: false,
      newNote: {},
      noteTag: {},
      search: "",
      notes: [],
    };
  },
  mounted() {
    this.notes = this.selectedCategory.notes;
  },
  methods: {
    toggleEditCategoryModal() {
      this.editCategoryModal = !this.editCategoryModal;
    },
    toggleNoteModal() {
      if (this.showNoteModal) this.newNote = {};
      this.showNoteModal = !this.showNoteModal;
    },

    searchNote() {
      this.notes = this.selectedCategory.notes;
      let matchingSearch = [];
      this.selectedCategory.notes.forEach((note) => {
        if (note.noteTitle.toLowerCase().includes(this.search.toLowerCase())) {
          matchingSearch.push(note);
        }
      });

      this.notes = matchingSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 20em;
  height: 100%;
  background-color: #f5f7f8;
  overflow-y: auto;

  .note-actions {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;

    input {
      margin: 10px 0;
    }

    input,
    button {
      padding: 10px 0;
      border-radius: 5px;
      border: none;
    }

    button {
      cursor: pointer;
      margin: 0 0 15px;
    }
  }

  .note {
    padding: 0 10px;
    text-align: left;
    cursor: pointer;

    &:hover {
      background-color: #b6bec2;
    }

    span {
      margin: 0 10px 0 0;
      padding: 5px;
      border-radius: 5px;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>