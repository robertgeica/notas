<template>
  <div class="sidebar">
    <h3>Notes-App</h3>

    <div class="categories-actions">
      <h4>Categories</h4>
      <span>+</span>
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
      <span>+</span>
    </div>

    <div class="tag" :key="tag.id" v-for="tag in tags">
      <h5
        :style="{
          'background': `${tag.tagColor}`,
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
  props: ['categories', 'tags']
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