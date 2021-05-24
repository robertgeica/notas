<template>
  <div class="sidebar" v-if="showSidebar">
    <h3>Notes-App</h3>

    <div v-if="showModal">
      <Modal @close="toggleModal">
        <template v-slot:actions>
          <input type="text" v-model="newCategoryName" class="input" />
          <button
            @click="
              $emit('add-category', newCategoryName);
              toggleModal();
            "
          >
            Add category
          </button>
        </template>

        <p>Add new category</p>
      </Modal>
    </div>

    <div v-if="showTagModal">
      <Modal @close="toggleTagModal">
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
              $emit('add-tag', newTagObj);
              toggleTagModal();
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
      <span @click="toggleModal">+</span>
    </div>

    <div
      class="category"
      :key="category.id"
      v-for="category in categories"
      @click="$emit('get-category', category.id)"
    >
      <h5>{{ category.categoryName }}</h5>
      <span>{{ category.notes.length }}</span>
    </div>

    <div class="tags-actions">
      <h4>Tags</h4>
      <span @click="toggleTagModal">+</span>
    </div>

    <div class="tag" :key="tag.id" v-for="tag in tags">
      <h5
        :style="{
          background: `${tag.tagColor}`,
        }"
      >
        {{ tag.tagName }}
      </h5>

      <span @click="$emit('delete-tag', tag.id)"
        ><i class="fas fa-trash-alt"></i
      ></span>
    </div>

    <i class="fas fa-arrow-left toggle-arrow" @click="toggleSidebar"></i>
  </div>
  <div class="toggle-sidebar-on" v-else>
    <i class="fas fa-arrow-right toggle-arrow" @click="toggleSidebar"></i>
  </div>
</template>

<script>
import Modal from "../components/Modal";
export default {
  name: "Sidebar",
  props: ["categories", "tags"],
  components: { Modal },
  data() {
    return {
      showModal: false,
      showTagModal: false,
      newCategoryName: "",
      newTagObj: {},
      showSidebar: true,
    };
  },
  methods: {
    toggleModal() {
      if (this.showModal) this.newCategoryName = "";
      this.showModal = !this.showModal;
    },
    toggleTagModal() {
      if (this.showTagModal) this.newTagObj = {};
      this.showTagModal = !this.showTagModal;
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
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