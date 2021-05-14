<template>
  <div class="sidebar">
    <h3>Notes-App</h3>

    <div class="categories-actions">
      <h4>Categories</h4>
      <span>+</span>
    </div>

    <div class="category" :key="category.id" v-for="category in categories">
      <h5>{{ category.categoryName }}</h5>
      <span>{{ category.notes.length }}</span>
    </div>

    <div class="tags-actions">
      <h4>Tags</h4>
      <span>+</span>
    </div>

    <div class="tag" :key="tag.id" v-for="tag in tags">
      <h5
        :style="{
          'box-shadow': `${tag.tagColor} 0px 6px 12px -2px, ${tag.tagColor} 0px 3px 7px -3px`,
        }"
      >
        {{ tag.tagName }}
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      categories: [],
      tags: [],
    };
  },
  methods: {
    async getCategories() {
      const res = await fetch("http://localhost:5000/category");
      const data = await res.json();

      return data;
    },

    async getTags() {
      const res = await fetch("http://localhost:5000/tags");
      const data = await res.json();

      return data;
    },
  },
  async created() {
    this.categories = await this.getCategories();
    this.tags = await this.getTags();
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
  margin: 0;
  width: 10em;
  height: 100%;

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

  .tag {
    h5 {
      width: 100%;
      padding: 5px 0px;
      border-radius: 5px;
      cursor: pointer;
}
  }
}
</style>