<template>
  <div class="sidebar" v-if="showSidebar">
    <div
      v-if="useCategoryState.state.currentCategory.categoryName"
      class="category-actions"
    >
      <h3>{{ useCategoryState.state.currentCategory.categoryName }}</h3>
      <div class="button-icons">
        <span @click="toggleAddNoteModal"
          ><i class="far fa-plus-square"></i
        ></span>

        <span @click="toggleEditCategoryModal()">
          <i class="far fa-edit"></i>
        </span>

        <span
          @click="deleteCategory({id: useCategoryState.state.currentCategory.id})"
        >
          <i class="far fa-trash-alt"></i>
        </span>
      </div>

      
      <div v-if="showEditCategoryModal">
        <Modal @close="toggleEditCategoryModal">
          <template v-slot:actions>
            <input
              type="text"
              class="input"
              v-model="newCategoryName"
              placeholder="Category title"
            />

            <button
              @click="
                editCategory(
                  {id: useCategoryState.state.currentCategory.id,
                  categoryName: newCategoryName}
                );
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

    <div
      v-if="useCategoryState.state.currentCategory.categoryName"
      class="search-action"
    >
      <input
        type="text"
        placeholder="search"
        v-model="search"
        @keyup="searchNote"
      />
    </div>

    <div v-if="showAddNoteModal">
      <Modal @close="toggleAddNoteModal">
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

          <div class="tag-select-container">
            <span
              class="tag-select"
              :key="tag.tagName"
              v-for="tag in useTagState.state.allTags"
              :style="{
                background: `${tag.tagColor} `,
                border: `${
                  noteTags.find((id) => id === tag.id) ? '3px solid black' : ''
                }`,
              }"
              @click="addTagId(tag.id)"
            >
              #{{ tag.tagName }}
            </span>
          </div>
          <p>Added tags: {{ noteTags }}</p>

          <button
            @click="
              addNote(
                useCategoryState.state.currentCategory,
                newNote,
                noteTags
              );
              toggleAddNoteModal();
              newNote = {};
              noteTags = [];
            "
          >
            Add note
          </button>
        </template>

        <h3>Add new note</h3>
      </Modal>
    </div>

    <div
      :key="note"
      v-for="note in searchNote()"
      @click="
        getCurrentNote(note);
        setSelected(note.noteTitle);
      "
      :class="{ selected: note.noteTitle == selected }"
      class="note"
    >
      <h4 class="note-title">{{ note.noteTitle }}</h4>
      <div class="tags">
        <span
          :key="tag"
          v-for="tag in note.noteTags"
          :style="{
            background: `${useTagState.state.allTags
              .filter((tagItem) => tagItem.id === tag)
              .map((obj) => obj.tagColor)} `,
          }"
        >
          #{{
            useTagState.state.allTags
              .filter((tagItem) => tagItem.id === tag)
              .map((obj, index) => obj.tagName)[0]
          }}
        </span>
      </div>
      <p>{{ note.noteBody.substr(0, 100) }} ...</p>
    </div>
    <div class="sidebar-toggler">
      <i class="fas fa-arrow-left toggle-arrow" @click="toggleSidebar"></i>
    </div>
  </div>
  <div class="toggle-sidebar-on" v-else>
    <i class="fas fa-arrow-right toggle-arrow" @click="toggleSidebar"></i>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import Modal from "@/components/Modal";
import useDeleteCategoryMutation from "../mutations/deleteCategory";
import useEditCategoryMutation from "../mutations/editCategory";

export default {
  name: "Notes",
  components: { Modal },

  setup() {
    const useCategoryState = inject("useCategoryState");
    const useNoteState = inject("useNoteState");
    const useTagState = inject("useTagState");

    const { clearCurrentCategory, getAllCategories } = useCategoryState;
    const { getCurrentNote, addNote } = useNoteState;
    const { deleteCategory } = useDeleteCategoryMutation();
    const { editCategory } = useEditCategoryMutation();
;
    const showSidebar = ref(true);
    const toggleSidebar = () => (showSidebar.value = !showSidebar.value);

    const showEditCategoryModal = ref(false);
    const toggleEditCategoryModal = () =>
      (showEditCategoryModal.value = !showEditCategoryModal.value);

    const newCategoryName = ref();

    const showAddNoteModal = ref(false);
    const toggleAddNoteModal = () => {
      showAddNoteModal.value = !showAddNoteModal.value;
    };
    const newNote = ref({});

    let noteTags = ref([]);
    const addTagId = (tagId) => {
      let removedFlag = false;
      noteTags.value.forEach((noteTagId) => {
        if (noteTagId === tagId) {
          noteTags.value = noteTags.value.filter((id) => id !== tagId);
          removedFlag = true;
          return;
        }
      });

      if (!removedFlag) {
        noteTags.value.push(tagId);
      }
      console.log(noteTags.value);
    };

    
    const search = ref("");

    const searchNote = () => {
      if (!search.value.toLowerCase().trim())
        return useCategoryState.state.currentCategory.notes;
      return useCategoryState.state.currentCategory.notes.filter(
        (note) => note.noteTitle.toLowerCase().indexOf(search.value) > -1
      );
    };

    const selected = ref(null);
    const setSelected = (value) => {
      selected.value = value;
    };


    return {
      showSidebar,
      toggleSidebar,
      clearCurrentCategory,
      getAllCategories,
      showEditCategoryModal,
      toggleEditCategoryModal,

      deleteCategory,
      useCategoryState,
      useTagState,
      newCategoryName,
      editCategory,
      getCurrentNote,
      addNote,
      addTagId,

      showAddNoteModal,
      toggleAddNoteModal,
      newNote,
      noteTags,

      search,
      searchNote,
      selected,
      setSelected,
    };
  },
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: #b6bec2;
}

.sidebar-toggler {
  position: fixed;
  bottom: 0%;
  margin-left: 16em;
  width: auto;
}

.sidebar {
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 20em;
  min-width: 20em;
  height: 100%;
  background-color: #f5f7f8;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  .category-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;

    .button-icons {
      margin: auto 0 auto 1em;

      span {
        margin: 0.5em 0 0.5em 0.5em;
        cursor: pointer;

        &:hover {
          color: #797979;
        }

        i {
          margin-left: 0.5em;
          font-size: 1.1em;
        }
      }
    }
  }

  .search-action {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;

    input {
      margin: 10px 0;
      padding: 10px 0;
      border-radius: 5px;
      border: none;
      width: 100%;
    }

    span {
      margin: auto 0;
      font-size: 1.1em;
      cursor: pointer;
    }
  }

  .note {
    padding: 0 10px;
    text-align: left;
    cursor: pointer;
    width: 90%;
    margin: 0 auto;
    &:hover {
      background-color: #b6bec2;
    }

    .note-title {
      margin: 1em 0;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
    }

    span {
      margin: 10px 10px 0 0;
      padding: 5px;
      border-radius: 5px;
      color: #fff;
      font-size: 14px;
    }
  }
  .tag-select-container {
    margin: 1em;

    .tag-select {
      margin: 0.5em;
      padding: 0.2em;
      border: 1px solid black;
      border-radius: 5px;
      cursor: pointer;
      color: #fff;
    }
  }
}
</style>