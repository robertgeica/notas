<template>
  <div class="sidebar" v-if="showSidebar">
    <div
      v-if="useCategoryState.state.currentCategory.categoryName"
      class="note-actions"
    >
      <h3>{{ useCategoryState.state.currentCategory.categoryName }}</h3>
      <button
        class="button"
        @click="deleteCategory(useCategoryState.state.currentCategory.id)"
      >
        Delete category
      </button>

      <button class="button" @click="toggleEditCategoryModal()">
        Edit category
      </button>
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
                  newCategoryName,
                  useCategoryState.state.currentCategory
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
      class="note-actions"
    >
      <input
        type="text"
        placeholder="search"
        v-model="search"
        @keyup="searchNote"
      />
      <button>Add note</button>
    </div>

    <i class="fas fa-arrow-left toggle-arrow" @click="toggleSidebar"></i>
  </div>
  <div class="toggle-notesbar-on" v-else>
    <i class="fas fa-arrow-right toggle-arrow" @click="toggleSidebar"></i>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import Modal from "@/components/Modal";

export default {
  name: "Notes",
  components: { Modal },

  setup() {
    const useCategoryState = inject("useCategoryState");
    const { deleteCategory, editCategory } = useCategoryState;

    const showSidebar = ref(true);
    const toggleSidebar = () => (showSidebar.value = !showSidebar.value);

    const showEditCategoryModal = ref(false);
    const toggleEditCategoryModal = () =>
      (showEditCategoryModal.value = !showEditCategoryModal.value);

    const newCategoryName = ref("");

    return {
      showSidebar,
      toggleSidebar,

      showEditCategoryModal,
      toggleEditCategoryModal,

      deleteCategory,
      useCategoryState,
      newCategoryName,
      editCategory,
    };
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
}
</style>