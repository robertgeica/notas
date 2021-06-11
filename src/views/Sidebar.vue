<template>
  <h1></h1>
  <div class="sidebar" v-if="showSidebar">
    <h3>Notes-App</h3>

    <div v-if="showAddCategoryModal">
      <Modal @close="toggleAddCategoryModal">
        <template v-slot:actions>
          <input type="text" v-model="newCategoryName" class="input" />
          <button
            @click="
              addNewCategory({ categoryName: newCategoryName });
              toggleAddCategoryModal();
              newCategoryName = '';
            "
          >
            Add category
          </button>
        </template>

        <p>Add new category</p>
      </Modal>
    </div>

    <div v-if="showAddTagModal">
      <Modal @close="toggleAddTagModal">
        <template v-slot:actions>
          <input
            type="text"
            v-model="newTagObj.tagName"
            class="input"
            placeholder="Tag name"
          />
          <input
            type="text"
            v-model="newTagObj.tagColor"
            class="input"
            placeholder="Tag color"
          />

          <button
            @click="
              addNewTag(newTagObj);
              toggleAddTagModal();
              newTagObj = {};
            "
          >
            Add tag
          </button>
        </template>

        <p>Add new tag</p>
      </Modal>
    </div>

    <div class="categories-actions">
      <h4>Categories</h4>
      <span class="add" @click="toggleAddCategoryModal()">+</span>
    </div>

    <div
      class="category"
      v-for="category in allCategories"
      :key="category.id"
      @click="getCurrentCategory(category)"
    >
      <h5>{{ category.categoryName }}</h5>
      <span>{{ category.notes.length }}</span>
    </div>

    <div class="tags-actions">
      <h4>Tags</h4>
      <span class="add" @click="toggleAddTagModal">+</span>
    </div>

    <div class="tag" :key="tag.id" v-for="tag in allTags">
      <h5
        :style="{
          background: `${tag.tagColor}`,
        }"
      >
        #{{ tag.tagName }}
      </h5>

      <span @click="deleteTag(tag.id)"><i class="fas fa-trash-alt"></i></span>
    </div>

    <i class="fas fa-arrow-left toggle-arrow" @click="toggleSidebar"></i>
  </div>
  <div class="toggle-sidebar-on" v-else>
    <i class="fas fa-arrow-right toggle-arrow" @click="toggleSidebar"></i>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import Modal from "@/components/Modal";
import useAddCategoryMutation from "../mutations/addNewCategory";
export default {
  name: "Sidebar",
  components: { Modal },
  props: ["allCategories", "allTags"],

  setup() {
    const useCategoryState = inject("useCategoryState");
    const useTagState = inject("useTagState");
    const { getCurrentCategory } = useCategoryState;
    const { addNewTag, deleteTag } = useTagState;

    const { addNewCategory } = useAddCategoryMutation();

    const showSidebar = ref(true);
    const toggleSidebar = () => (showSidebar.value = !showSidebar.value);

    const showAddCategoryModal = ref(false);
    const toggleAddCategoryModal = () =>
      (showAddCategoryModal.value = !showAddCategoryModal.value);

    const newCategoryName = ref(null);

    const showAddTagModal = ref(false);
    const toggleAddTagModal = () =>
      (showAddTagModal.value = !showAddTagModal.value);

    const newTagObj = ref({});
    return {
      getCurrentCategory,

      showSidebar,
      toggleSidebar,

      showAddCategoryModal,
      toggleAddCategoryModal,

      newCategoryName,
      addNewCategory,

      showAddTagModal,
      toggleAddTagModal,

      newTagObj,
      addNewTag,
      deleteTag,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 13em;
  height: 100%;
  background-color: #ecf0f1;
  overflow-y: scroll;

  .input {
    border: 1px solid grey;
    margin: 10px 0;
  }

  .categories-actions,
  .category,
  .tags-actions,
  .tag {
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;

    span {
      margin: auto 0 auto 1em;
      cursor: pointer;
    }
  }

  .category {
    margin: 5px auto;
    h5 {
    }
    cursor: pointer;
  }
  .tag {
    h5 {
      width: 100%;
      padding: 5px 0px;
      border-radius: 5px;
      cursor: pointer;
      color: #fff;
    }
  }
}
</style>