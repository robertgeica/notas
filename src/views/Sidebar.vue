<template>
  <h1></h1>
  <div class="sidebar"  v-if="showSidebar">
    <h3>Notes-App</h3>

    <div class="categories-actions">
      <h4>Categories</h4>
      <span class="add">+</span>
    </div>

    <div
      class="category"
      v-for="category in allCategories"
      :key="category.id"
      @click="getCurrentCategory(category.id)"
    >
      <h5>{{ category.categoryName }}</h5>
      <span>{{ category.notes.length }}</span>
    </div>

    <div class="tags-actions">
      <h4>Tags</h4>
      <span class="add">+</span>
    </div>

    <div class="tag">
      <h5></h5>

      <spanS><i class="fas fa-trash-alt"></i></spanS>
    </div>

    <i class="fas fa-arrow-left toggle-arrow" @click="toggleSidebar"></i>
  </div>
  <div class="toggle-sidebar-on" v-else>
    <i class="fas fa-arrow-right toggle-arrow" @click="toggleSidebar"></i>
  </div>
</template>

<script>
import { ref } from 'vue';
import useCategoryState from "@/store/useCategoryState";

export default {
  name: "Sidebar",

  async setup() {
    const { getAllCategories, getCurrentCategory } = useCategoryState;
    const allCategories = await getAllCategories();

    const showSidebar = ref(true);
    const toggleSidebar = () => {
      showSidebar.value = !showSidebar.value;
    }

    return {
      allCategories,
      getCurrentCategory,

      showSidebar,
      toggleSidebar
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